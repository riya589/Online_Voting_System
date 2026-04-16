package com.evoting.repository;

import com.evoting.model.Vote;
import com.evoting.model.User;
import com.evoting.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUser(User user);
    Boolean existsByUser(User user);
    Boolean existsByCandidate(Candidate candidate);
}
