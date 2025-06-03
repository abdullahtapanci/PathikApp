package com.pathik.pathikbackend.service.impl;

import com.pathik.pathikbackend.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    public void sendVerificationEmail(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("cenkeren123@hotmail.com");
        message.setTo(toEmail);
        message.setSubject("Your Verification Code");
        message.setText("Your verification code is: " + code);

        mailSender.send(message);
    }



}