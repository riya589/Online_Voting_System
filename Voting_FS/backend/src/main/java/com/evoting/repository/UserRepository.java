package com.evoting.repository;

import com.evoting.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVoterId(String voterId);
    Boolean existsByEmail(String email);
    Boolean existsByVoterId(String voterId);
}
