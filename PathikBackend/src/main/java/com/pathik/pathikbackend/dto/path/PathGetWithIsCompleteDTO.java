package com.pathik.pathikbackend.dto.path;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PathGetWithIsCompleteDTO {
    private String token;
    private Integer isComplete;
}
