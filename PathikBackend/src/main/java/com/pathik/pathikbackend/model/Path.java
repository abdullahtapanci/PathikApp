package com.pathik.pathikbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Path {

    @Id
    @Column(name="path_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="stars", nullable=false)
    private Float stars;

    @Column(name="country", nullable=false)
    private String country;

    @Column(name="city", nullable=false)
    private String city;

    @Column(name="image", nullable=false)
    private String image;

    @Column(name="is_complete", nullable=false)
    private Integer isComplete = 0;

    @ManyToMany
    @JoinTable(
            name = "path_place",
            joinColumns = @JoinColumn(name = "path_id"),
            inverseJoinColumns = @JoinColumn(name = "place_id")
    )
    private List<Place> places;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
