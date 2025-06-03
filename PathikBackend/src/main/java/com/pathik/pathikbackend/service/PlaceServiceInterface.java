package com.pathik.pathikbackend.service;

import com.pathik.pathikbackend.dto.place.PlaceDTO;
import com.pathik.pathikbackend.dto.place.PlaceDetailsDTO;
import com.pathik.pathikbackend.dto.place.placeImage.TripadvisorPhotoResponseDTO;

import java.util.List;

public interface PlaceServiceInterface {
    public List<PlaceDetailsDTO> searchPlace(String searchQuery);
    public PlaceDetailsDTO getPlaceDetails(String placeId);
    public TripadvisorPhotoResponseDTO getPlaceImages(String placeId);
    public List<PlaceDetailsDTO> getNearbyLocations(String latitude, String longitude, String category);
}
