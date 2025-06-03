package com.pathik.pathikbackend.repository;

import com.pathik.pathikbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT password FROM user WHERE email = :email", nativeQuery = true)
    String findPasswordByEmail(@Param("email") String email);
}
