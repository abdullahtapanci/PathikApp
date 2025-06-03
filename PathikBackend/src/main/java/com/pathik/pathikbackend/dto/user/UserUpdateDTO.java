package com.pathik.pathikbackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
}
