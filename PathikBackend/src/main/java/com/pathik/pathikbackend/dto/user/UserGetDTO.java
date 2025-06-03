package com.pathik.pathikbackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserGetDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String username;
    private String image;
    private String email;
    private String password;

}
