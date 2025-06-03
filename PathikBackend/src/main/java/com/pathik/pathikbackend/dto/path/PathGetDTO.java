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
public class PathGetDTO {
    private Integer id;
    private String name;
    private String city;
    private String country;
    private Float stars;
    private String image;
}
