package com.pathik.pathikbackend.dto.path;

import com.pathik.pathikbackend.dto.place.PlaceIdDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PathInsertDTO {
    private String name;
    private String city;
    private String country;
    private List<PlaceIdDTO> placesIds;
    private String token;
    private String image;
}
