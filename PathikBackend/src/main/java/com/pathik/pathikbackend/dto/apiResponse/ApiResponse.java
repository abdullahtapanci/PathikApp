package com.pathik.pathikbackend.dto.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private ApiError<T> error;

    // Constructors
    public ApiResponse(T data) {
        this.success = true;
        this.data = data;
    }

    public ApiResponse(ApiError<T> error) {
        this.success = false;
        this.error = error;
    }


}
