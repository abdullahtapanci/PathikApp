package com.pathik.pathikbackend.repository;

import com.pathik.pathikbackend.dto.place.PlaceIdDTO;
import com.pathik.pathikbackend.model.Path;
import com.pathik.pathikbackend.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathRepository extends JpaRepository<Path, Integer> {
    List<Path> findAllByUserAndIsComplete(User user, Integer isComplete);

    @Query(value = "SELECT p.place_id_tripadvisor " +
            "FROM path_place pp " +
            "JOIN place p ON pp.place_id = p.place_id " +
            "WHERE pp.path_id = :pathId", nativeQuery = true)
    List<PlaceIdDTO> findTripadvisorPlaceIdsByPathId(@Param("pathId") Integer pathId);

    @Modifying
    @Transactional
    @Query("UPDATE Path p SET p.isComplete = :isComplete WHERE p.id = :pathId")
    int updateIsCompleteById(@Param("pathId") Integer pathId, @Param("isComplete") Integer isComplete);

    List<Path> findTop10ByOrderByIdAsc();
}
