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
public class Place {

    @Id
    @Column(name="place_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="place_id_tripadvisor", unique = true)
    private String placeID;

    @ManyToMany(mappedBy = "places")
    private List<Path> paths;
}
