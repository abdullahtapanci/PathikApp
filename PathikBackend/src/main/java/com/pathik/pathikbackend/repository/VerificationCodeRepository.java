package com.pathik.pathikbackend.repository;

import com.pathik.pathikbackend.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    VerificationCode findByEmail(String email);

}
