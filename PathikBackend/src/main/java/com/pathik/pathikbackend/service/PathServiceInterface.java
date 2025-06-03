package com.pathik.pathikbackend.service;

import com.pathik.pathikbackend.dto.id.IdDTO;
import com.pathik.pathikbackend.dto.path.PathGetDTO;
import com.pathik.pathikbackend.dto.path.PathGetWithIsCompleteDTO;
import com.pathik.pathikbackend.dto.path.PathGetWithPlacesDTO;
import com.pathik.pathikbackend.dto.path.PathInsertDTO;
import com.pathik.pathikbackend.dto.token.tokenDTO;

import java.util.List;

public interface PathServiceInterface {
    public String CreatePath(PathInsertDTO path);

    public List<PathGetDTO> getPaths(PathGetWithIsCompleteDTO pathGetWithIsCompleteDTO);

    public PathGetWithPlacesDTO getPath(IdDTO idDTO);

    public void deletePathById(Integer id);

    public boolean updateIsComplete(Integer pathId, Integer isComplete);

    public List<PathGetDTO> getAllPaths();
}
