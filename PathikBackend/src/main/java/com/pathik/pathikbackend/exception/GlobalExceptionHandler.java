package com.pathik.pathikbackend.exception;

import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.apiResponse.ApiResponse;
import com.pathik.pathikbackend.enums.CustomStatusCodes;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ApiResponse<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        for(ObjectError error : ex.getBindingResult().getAllErrors()) {
            String fieldName = ((FieldError) error).getField();
            if(errors.containsKey(fieldName)) {
                errors.get(fieldName).add(error.getDefaultMessage());
            }else{
                List<String> errorList = new ArrayList<>();
                errors.put(fieldName, errorList);
                errors.get(fieldName).add(error.getDefaultMessage());
            }
        }
        ApiError<Map<String, List<String>>> apiError = new ApiError<>(CustomStatusCodes.ERROR_VALIDATION.getCode(), CustomStatusCodes.ERROR_VALIDATION.getMessage(), errors);
        return new ApiResponse<>(apiError);
    }
}
