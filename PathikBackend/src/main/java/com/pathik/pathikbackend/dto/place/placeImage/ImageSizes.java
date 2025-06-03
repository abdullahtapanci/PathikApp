package com.pathik.pathikbackend.dto.place.placeImage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageSizes {
    private ImageInfo small;
    private ImageInfo medium;
    private ImageInfo large;
    private ImageInfo original;
}
