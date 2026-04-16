package com.evoting.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "voter_id", unique = true, nullable = false)
    private String voterId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "has_voted")
    private boolean hasVoted = false;
}
