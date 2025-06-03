package com.pathik.pathikbackend.controller;

import com.pathik.pathikbackend.dto.apiResponse.ApiError;
import com.pathik.pathikbackend.dto.apiResponse.ApiResponse;
import com.pathik.pathikbackend.enums.CustomStatusCodes;
import com.pathik.pathikbackend.service.PlaceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    private PlaceServiceInterface placeService;

    @GetMapping("/search")
    public ApiResponse<?> searchQuery(@RequestParam("searchQuery") String searchQuery) {
        try{
            return new ApiResponse<>(placeService.searchPlace(searchQuery));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @GetMapping("/searchWithId")
    public ApiResponse<?> searchWithUserId(@RequestParam("searchId") String searchId) {
        try{
            return new ApiResponse<>(placeService.getPlaceDetails(searchId));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

    @GetMapping("/searchNearby")
    public ApiResponse<?> searchWithUserId(@RequestParam("latitude") String latitude, @RequestParam("longitude") String longitude, @RequestParam("category") String category) {
        try{
            return new ApiResponse<>(placeService.getNearbyLocations(latitude, longitude, category));
        }catch(Exception e){
            ApiError<Object> error = new ApiError<>(CustomStatusCodes.ERROR_CREATE_USER.getCode(), CustomStatusCodes.ERROR_CREATE_USER.getMessage(), e.getMessage());
            return new ApiResponse<>(error);
        }
    }

}
