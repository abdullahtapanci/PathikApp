package com.pathik.pathikbackend.dto.place.placeImage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TripadvisorPhotoResponseDTO {
    private List<PhotoDTO> data;
}
