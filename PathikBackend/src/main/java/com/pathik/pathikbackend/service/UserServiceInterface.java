package com.pathik.pathikbackend.service;

import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.user.UpdateEmailDTO;
import com.pathik.pathikbackend.dto.user.UpdatePasswordDTO;
import com.pathik.pathikbackend.dto.user.UserGetDTO;
import com.pathik.pathikbackend.dto.user.UserUpdateDTO;

public interface UserServiceInterface {
    public UserGetDTO getUser(String token);

    public UserGetDTO updateUser(UserUpdateDTO userUpdateDTO);

    public UserGetDTO updateUserEmail(UpdateEmailDTO updateEmailDTO);

    public UserGetDTO updateUserPassword(UpdatePasswordDTO updatePasswordDTO);
}
