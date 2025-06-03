package com.pathik.pathikbackend.repository;

import com.pathik.pathikbackend.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {
    Optional<Place> findByplaceID(String locationId);

    List<Place> findAllByPlaceIDIn(List<String> placeIDs);
}
