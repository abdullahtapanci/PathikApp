package com.pathik.pathikbackend.dto.place;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TripadvisorPlaceSearchResponseDTO {
    private List<PlaceDTO> data;
}
