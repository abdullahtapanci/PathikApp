package com.pathik.pathikbackend.dto.place;

import com.pathik.pathikbackend.dto.place.placeImage.TripadvisorPhotoResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDetailsDTO {
    private String location_id;
    private String name;
    private String description;
    private String latitude;
    private String longitude;
    private String rating;
    private AddressObject address_obj;
    private TripadvisorPhotoResponseDTO tripadvisor_photo;
}
