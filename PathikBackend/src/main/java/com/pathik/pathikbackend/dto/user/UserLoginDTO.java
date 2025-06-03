package com.pathik.pathikbackend.dto.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    private String email;
    private String password;
}
