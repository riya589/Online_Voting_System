package com.evoting.controller;

import com.evoting.model.Role;
import com.evoting.model.User;
import com.evoting.payload.request.LoginRequest;
import com.evoting.payload.request.SignupRequest;
import com.evoting.payload.response.JwtResponse;
import com.evoting.payload.response.MessageResponse;
import com.evoting.repository.UserRepository;
import com.evoting.security.JwtUtils;
import com.evoting.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		User user = userRepository.findById(userDetails.getId()).get();

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 user.getName(), 
												 userDetails.getEmail(), 
												 user.getVoterId(),
												 roles,
												 user.isHasVoted()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		if (userRepository.existsByVoterId(signUpRequest.getVoterId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Voter ID is already registered!"));
		}

		// Create new user's account
		User user = User.builder()
				.name(signUpRequest.getName())
				.email(signUpRequest.getEmail())
				.password(encoder.encode(signUpRequest.getPassword()))
				.voterId(signUpRequest.getVoterId())
				.hasVoted(false)
				.build();

		// Handle role assignment
		String strRole = signUpRequest.getRole();
		if (strRole == null || strRole.isEmpty()) {
			user.setRole(Role.ROLE_VOTER);
		} else {
			switch (strRole.toLowerCase()) {
				case "admin":
				case "administrator":
					user.setRole(Role.ROLE_ADMIN);
					break;
				default:
					user.setRole(Role.ROLE_VOTER);
			}
		}

		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
