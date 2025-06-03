package com.pathik.pathikbackend.service.impl;

import com.pathik.pathikbackend.dto.auth.AuthDTO;
import com.pathik.pathikbackend.dto.user.UserInsertDTO;
import com.pathik.pathikbackend.dto.user.UserLoginDTO;
import com.pathik.pathikbackend.model.User;
import com.pathik.pathikbackend.model.VerificationCode;
import com.pathik.pathikbackend.repository.UserRepository;
import com.pathik.pathikbackend.repository.VerificationCodeRepository;
import com.pathik.pathikbackend.service.AuthenticationServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class AuthenticationServiceImpl implements AuthenticationServiceInterface {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthDTO registerUser(UserInsertDTO newUser) {

        String code = generateVerificationCode();

        User user = new User();
        BeanUtils.copyProperties(newUser, user);
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(user);
        AuthDTO authDTO = new AuthDTO();
        var jwtToken = jwtService.generateToken(user.getEmail());
        authDTO.setToken(jwtToken);

        emailService.sendVerificationEmail(user.getEmail(), code);

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(code);
        verificationCode.setEmail(user.getEmail());

        verificationCodeRepository.save(verificationCode);


        return authDTO;
    }

    @Override
    public AuthDTO loginUser(UserLoginDTO userLoginDTO){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.getEmail(), userLoginDTO.getPassword())
        );

        var user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AuthDTO authDTO = new AuthDTO();
        var jwtToken = jwtService.generateToken(userLoginDTO.getEmail());
        authDTO.setToken(jwtToken);
        return authDTO;
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    @Transactional
    public boolean userVerify(String email, String code) {
        VerificationCode codeData = verificationCodeRepository.findByEmail(email);
        if (codeData != null && codeData.getCode().equals(code)) {
            verificationCodeRepository.delete(codeData);
            return true;
        }
        return false;
    }



}
