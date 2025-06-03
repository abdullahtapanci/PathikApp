package com.pathik.pathikbackend.service.impl;

import com.pathik.pathikbackend.dto.user.UpdateEmailDTO;
import com.pathik.pathikbackend.dto.user.UpdatePasswordDTO;
import com.pathik.pathikbackend.dto.user.UserGetDTO;
import com.pathik.pathikbackend.dto.user.UserUpdateDTO;
import com.pathik.pathikbackend.model.User;
import com.pathik.pathikbackend.repository.UserRepository;
import com.pathik.pathikbackend.service.UserServiceInterface;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserGetDTO getUser(String token){
        String email = jwtService.extractEmail(token);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new RuntimeException("User not found with email: " + email);
        }
        User user = userOptional.get();
        UserGetDTO userGetDTO = new UserGetDTO();
        BeanUtils.copyProperties(user, userGetDTO);
        userGetDTO.setUsername(user.getActualUsername());
        return userGetDTO;
    }

    @Override
    public UserGetDTO updateUser(UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findByEmail(userUpdateDTO.getEmail()).get();
        if (userUpdateDTO.getFirstName() != null) {
            user.setFirstName(userUpdateDTO.getFirstName());
        }
        if (userUpdateDTO.getLastName() != null) {
            user.setLastName(userUpdateDTO.getLastName());
        }
        if (userUpdateDTO.getUsername() != null) {
            user.setActualUsername(userUpdateDTO.getUsername());
        }
        User updatedUser = userRepository.save(user);
        UserGetDTO userGetDTO = new UserGetDTO();
        BeanUtils.copyProperties(updatedUser, userGetDTO);
        userGetDTO.setUsername(user.getActualUsername());
        return userGetDTO;
    }


    public UserGetDTO updateUserEmail(UpdateEmailDTO updateEmailDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(updateEmailDTO.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with email: " + updateEmailDTO.getEmail());
        }

        User user = optionalUser.get();

        if (updateEmailDTO.getNewEmail() != null && !updateEmailDTO.getNewEmail().isBlank()) {
            user.setEmail(updateEmailDTO.getNewEmail());
        } else {
            throw new IllegalArgumentException("New email cannot be null or blank");
        }

        User updatedUser = userRepository.save(user);

        UserGetDTO userGetDTO = new UserGetDTO();
        BeanUtils.copyProperties(updatedUser, userGetDTO);
        userGetDTO.setUsername(user.getActualUsername());

        return userGetDTO;
    }


    public UserGetDTO updateUserPassword(UpdatePasswordDTO updatePasswordDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(updatePasswordDTO.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with email: " + updatePasswordDTO.getEmail());
        }

        User user = optionalUser.get();

        if (updatePasswordDTO.getNewPassword() != null && !updatePasswordDTO.getNewPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
        } else {
            throw new IllegalArgumentException("New password cannot be null or blank");
        }

        User updatedUser = userRepository.save(user);

        UserGetDTO userGetDTO = new UserGetDTO();
        BeanUtils.copyProperties(updatedUser, userGetDTO);
        userGetDTO.setUsername(user.getActualUsername());

        return userGetDTO;
    }

}
