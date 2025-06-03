package com.pathik.pathikbackend.controller;

import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.apiResponse.ApiResponse;
import com.pathik.pathikbackend.dto.user.UpdateEmailDTO;
import com.pathik.pathikbackend.dto.user.UpdatePasswordDTO;
import com.pathik.pathikbackend.dto.user.UserUpdateDTO;
import com.pathik.pathikbackend.enums.CustomStatusCodes;
import com.pathik.pathikbackend.service.PlaceServiceInterface;
import com.pathik.pathikbackend.service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceInterface userService;

    @GetMapping("/get")
    public ApiResponse<?> getUser(@RequestHeader("Authorization") String authHeader) {
        try{
            String token = authHeader.replace("Bearer ", "");
            return new ApiResponse<>(userService.getUser(token));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }


    @PostMapping("/update")
    public ApiResponse<?> updateUser(@RequestBody UserUpdateDTO userUpdateDTO) {
        try{
            return new ApiResponse<>(userService.updateUser(userUpdateDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @PostMapping("/updateEmail")
    public ApiResponse<?> updateUserEmail(@RequestBody UpdateEmailDTO updateEmailDTO) {
        try{
            return new ApiResponse<>(userService.updateUserEmail(updateEmailDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @PostMapping("/updatePassword")
    public ApiResponse<?> updateUserPassword(@RequestBody UpdatePasswordDTO updatePasswordDTO) {
        try{
            return new ApiResponse<>(userService.updateUserPassword(updatePasswordDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }
}
