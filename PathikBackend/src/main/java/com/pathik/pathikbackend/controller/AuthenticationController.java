package com.pathik.pathikbackend.controller;


import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.apiResponse.ApiResponse;
import com.pathik.pathikbackend.dto.auth.VerifyEmailDTO;
import com.pathik.pathikbackend.dto.user.UserInsertDTO;
import com.pathik.pathikbackend.dto.user.UserLoginDTO;
import com.pathik.pathikbackend.enums.CustomStatusCodes;
import com.pathik.pathikbackend.service.AuthenticationServiceInterface;
import com.pathik.pathikbackend.service.impl.JWTService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationServiceInterface authenticationService;
    @Autowired
    private JWTService jWTService;


    @PostMapping("/register")
    public ApiResponse<?> registerUser(@Valid @RequestBody UserInsertDTO newUser) {
        try{
            return new ApiResponse<>(authenticationService.registerUser(newUser));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }


    @PostMapping("/login")
    public ApiResponse<?> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        try{
            return new ApiResponse<>(authenticationService.loginUser(userLoginDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_LOGIN_USER.getCode(), CustomStatusCodes.ERROR_LOGIN_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }


    @PostMapping("/verify-email")
    public ApiResponse<?> verifyEmail(@RequestBody VerifyEmailDTO verifyEmailDTO) {

        String token = verifyEmailDTO.getToken();
        String code = verifyEmailDTO.getCode();

        String email = jWTService.extractEmail(token);


        boolean verified = authenticationService.userVerify(email, code);

        if (verified) {
            return new ApiResponse<>("success");
        } else {
            return new ApiResponse<>("error");
        }
    }



}