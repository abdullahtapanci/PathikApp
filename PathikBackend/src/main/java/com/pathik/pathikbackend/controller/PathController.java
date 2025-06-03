package com.pathik.pathikbackend.controller;

import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.apiResponse.ApiResponse;
import com.pathik.pathikbackend.dto.id.IdDTO;
import com.pathik.pathikbackend.dto.path.PathGetWithIsCompleteDTO;
import com.pathik.pathikbackend.dto.path.PathInsertDTO;
import com.pathik.pathikbackend.dto.token.tokenDTO;
import com.pathik.pathikbackend.enums.CustomStatusCodes;
import com.pathik.pathikbackend.service.PathServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/path")
public class PathController {

    @Autowired
    private PathServiceInterface pathService;

    @PostMapping("/create")
    public ApiResponse<?> createPath(@RequestBody PathInsertDTO pathInsertDTO) {
        try{
            return new ApiResponse<>(pathService.CreatePath(pathInsertDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @PostMapping("/get")
    public ApiResponse<?> getPath(@RequestBody PathGetWithIsCompleteDTO pathGetWithIsCompleteDTO) {
        try{
            return new ApiResponse<>(pathService.getPaths(pathGetWithIsCompleteDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @PostMapping("/getWithId")
    public ApiResponse<?> getPathWithId(@RequestBody IdDTO idDTO) {
        try{
            return new ApiResponse<>(pathService.getPath(idDTO));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ApiResponse<?> deletePathById(@PathVariable Integer id) {
        try {
            pathService.deletePathById(id);
            return new ApiResponse<>("Path deleted successfully");
        } catch (Exception e) {
            ApiError<Object> error = new ApiError<>(
                    CustomStatusCodes.ERROR_DELETE_PATH.getCode(),
                    CustomStatusCodes.ERROR_DELETE_PATH.getMessage(),
                    e.getMessage()
            );
            return new ApiResponse<>(error);
        }
    }

    @PutMapping("/complete/{id}")
    public ApiResponse<?> updateIsComplete(@PathVariable Integer id, @RequestParam Integer isComplete) {
        try {
            boolean updated = pathService.updateIsComplete(id, isComplete);
            if (updated) {
                return new ApiResponse<>("Path completion status updated successfully");
            } else {
                ApiError<Object> error = new ApiError<>(
                        CustomStatusCodes.ERROR_UPDATE_PATH.getCode(),
                        CustomStatusCodes.ERROR_UPDATE_PATH.getMessage(),
                        "Path not found or update failed"
                );
                return new ApiResponse<>(error);
            }
        } catch (Exception e) {
            ApiError<Object> error = new ApiError<>(
                    CustomStatusCodes.ERROR_UPDATE_PATH.getCode(),
                    CustomStatusCodes.ERROR_UPDATE_PATH.getMessage(),
                    e.getMessage()
            );
            return new ApiResponse<>(error);
        }
    }

    @GetMapping("/all")
    public ApiResponse<?> getAllPaths() {
        try {
            return new ApiResponse<>(pathService.getAllPaths());
        } catch (Exception e) {
            ApiError<Object> error = new ApiError<>(
                    CustomStatusCodes.ERROR_UPDATE_PATH.getCode(),
                    CustomStatusCodes.ERROR_UPDATE_PATH.getMessage(),
                    e.getMessage()
            );
            return new ApiResponse<>(error);
        }
    }
}
