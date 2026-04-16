package com.evoting.controller;

import com.evoting.model.Candidate;
import com.evoting.model.User;
import com.evoting.model.Vote;
import com.evoting.payload.response.MessageResponse;
import com.evoting.repository.CandidateRepository;
import com.evoting.repository.UserRepository;
import com.evoting.repository.VoteRepository;
import com.evoting.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/vote")
public class VoteController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    VoteRepository voteRepository;

    @PostMapping("/{candidateId}")
    @PreAuthorize("hasRole('VOTER') or hasRole('ADMIN')")
    @Transactional
    public ResponseEntity<?> castVote(@PathVariable Long candidateId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        if (user.isHasVoted()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: You have already cast your vote!"));
        }

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Error: Candidate not found."));

        // Update candidate's vote count
        Integer currentVotes = candidate.getVoteCount();
        candidate.setVoteCount((currentVotes == null ? 0 : currentVotes) + 1);
        candidateRepository.save(candidate);

        // Record the vote
        Vote vote = Vote.builder()
                .user(user)
                .candidate(candidate)
                .votedAt(LocalDateTime.now())
                .build();
        voteRepository.save(vote);

        // Mark user as voted
        user.setHasVoted(true);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Vote cast successfully for " + candidate.getName() + "!"));
    }
}
