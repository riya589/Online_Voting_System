package com.evoting.controller;

import com.evoting.model.Candidate;
import com.evoting.payload.response.MessageResponse;
import com.evoting.repository.CandidateRepository;
import com.evoting.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {
    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    VoteRepository voteRepository;

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidateDetails) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found for this id :: " + id));

        candidate.setName(candidateDetails.getName());
        candidate.setParty(candidateDetails.getParty());
        candidate.setDescription(candidateDetails.getDescription());
        candidate.setPhotoUrl(candidateDetails.getPhotoUrl());

        final Candidate updatedCandidate = candidateRepository.save(candidate);
        return ResponseEntity.ok(updatedCandidate);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCandidate(@PathVariable Long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found for this id :: " + id));

        if (Boolean.TRUE.equals(voteRepository.existsByCandidate(candidate))) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("This candidate cannot be deleted because votes have already been cast for them."));
        }

        candidateRepository.delete(candidate);
        return ResponseEntity.ok(new MessageResponse("Candidate deleted successfully."));
    }
}
