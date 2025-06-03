package com.pathik.pathikbackend.service;

import com.pathik.pathikbackend.dto.auth.AuthDTO;
import com.pathik.pathikbackend.dto.user.UserInsertDTO;
import com.pathik.pathikbackend.dto.user.UserLoginDTO;
import com.pathik.pathikbackend.service.impl.JWTService;


public interface AuthenticationServiceInterface {

    public AuthDTO registerUser(UserInsertDTO newUser);
    public AuthDTO loginUser(UserLoginDTO userLoginDTO);
    public boolean userVerify(String email, String code);
}