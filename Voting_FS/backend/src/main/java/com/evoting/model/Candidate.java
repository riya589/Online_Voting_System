package com.evoting.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String party;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "photo_url")
    private String photoUrl;

    @Builder.Default
    @Column(name = "vote_count")
    private Integer voteCount = 0;
}
