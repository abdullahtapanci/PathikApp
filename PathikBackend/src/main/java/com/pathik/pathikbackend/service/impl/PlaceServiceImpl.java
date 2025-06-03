package com.pathik.pathikbackend.service.impl;

import com.pathik.pathikbackend.dto.place.PlaceDTO;
import com.pathik.pathikbackend.dto.place.PlaceDetailsDTO;
import com.pathik.pathikbackend.dto.place.TripadvisorPlaceSearchResponseDTO;
import com.pathik.pathikbackend.dto.place.placeImage.TripadvisorPhotoResponseDTO;
import com.pathik.pathikbackend.service.PlaceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceServiceInterface {

    private String APIKey = "UseYourApiKey";

    @Autowired
    private RestTemplate restTemplate;

    public  List<PlaceDetailsDTO> searchPlace(String searchQuery){
        String baseUrl = "https://api.content.tripadvisor.com/api/v1/location/search";
        String apiKey = APIKey;
        String url = String.format("%s?key=%s&searchQuery=%s&language=en",
                baseUrl,
                apiKey,
                URLEncoder.encode(searchQuery, StandardCharsets.UTF_8)
        );

        return getPlaceDetailsDTOS(url);
    }

    public PlaceDetailsDTO getPlaceDetails(String placeId){
        String baseUrl = "https://api.content.tripadvisor.com/api/v1/location/%s/details";
        String apiKey = APIKey;

        String url = String.format(
                baseUrl + "?key=%s&language=en&currency=USD",
                placeId,
                apiKey
        );

        PlaceDetailsDTO placeDetail = restTemplate.getForObject(url, PlaceDetailsDTO.class);
        placeDetail.setTripadvisor_photo(getPlaceImages(placeDetail.getLocation_id()));

        return placeDetail;
    }

    public TripadvisorPhotoResponseDTO getPlaceImages(String placeId){
        String url = String.format(
                "https://api.content.tripadvisor.com/api/v1/location/%s/photos?language=en&key=%s",
                placeId,
                APIKey
        );

        return restTemplate.getForObject(url, TripadvisorPhotoResponseDTO.class);
    }


    public List<PlaceDetailsDTO> getNearbyLocations(String latitude, String longitude, String category) {
        String baseUrl = "https://api.content.tripadvisor.com/api/v1/location/nearby_search";
        String apiKey = APIKey;

        String latLong = latitude + "," + longitude;

        // Start building URL
        StringBuilder urlBuilder = new StringBuilder(String.format(
                "%s?key=%s&language=en&currency=USD&latLong=%s",
                baseUrl,
                apiKey,
                latLong
        ));

        // If category is not null or empty, append it
        if (category != null && !category.trim().isEmpty()) {
            urlBuilder.append("&category=").append(category);
        }

        String url = urlBuilder.toString();

        return getPlaceDetailsDTOS(url);
    }

    private List<PlaceDetailsDTO> getPlaceDetailsDTOS(String url) {
        TripadvisorPlaceSearchResponseDTO response = restTemplate.getForObject(url, TripadvisorPlaceSearchResponseDTO.class);

        List<PlaceDetailsDTO> placeDetails = new ArrayList<>();

        if (response != null && response.getData() != null) {
            for(PlaceDTO place : response.getData()){
                PlaceDetailsDTO placeDetail = getPlaceDetails(place.getLocation_id());
                placeDetails.add(placeDetail);
            }
        }

        return placeDetails;
    }

}
