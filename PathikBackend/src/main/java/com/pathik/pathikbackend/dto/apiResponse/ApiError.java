package com.pathik.pathikbackend.dto.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiError<T> {
    private String code;
    private String message;
    private T details;

    // Constructors
    public ApiError(String code, String message) {
        this.code = code;
    }
}
