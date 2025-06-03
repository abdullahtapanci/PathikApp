package com.pathik.pathikbackend.dto.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInsertDTO {

    @NotBlank(message = "First name can not be empty.")
    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    @NotBlank(message = "Last name can not be empty.")
    @Size(min = 3, max = 20, message = "Last name must be between 3 and 20 characters")
    private String lastName;

    @NotBlank(message = "Username can not be empty.")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Email can not be empty.")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password can not be empty.")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$",
            message = "Password must contain at least one uppercase letter, one number, and one special character"
    )
    private String password;
}
