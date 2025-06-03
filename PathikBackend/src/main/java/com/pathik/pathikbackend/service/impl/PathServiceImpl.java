package com.pathik.pathikbackend.service.impl;

import com.pathik.pathikbackend.dto.id.IdDTO;
import com.pathik.pathikbackend.dto.path.PathGetDTO;
import com.pathik.pathikbackend.dto.path.PathGetWithIsCompleteDTO;
import com.pathik.pathikbackend.dto.path.PathGetWithPlacesDTO;
import com.pathik.pathikbackend.dto.path.PathInsertDTO;
import com.pathik.pathikbackend.dto.place.PlaceIdDTO;
import com.pathik.pathikbackend.model.Path;
import com.pathik.pathikbackend.model.Place;
import com.pathik.pathikbackend.model.User;
import com.pathik.pathikbackend.repository.PathRepository;
import com.pathik.pathikbackend.repository.PlaceRepository;
import com.pathik.pathikbackend.repository.UserRepository;
import com.pathik.pathikbackend.service.PathServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PathServiceImpl  implements PathServiceInterface {

    @Autowired
    private PathRepository pathRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private JWTService jwtService;

    public String CreatePath(PathInsertDTO pathDTO) {
        String email = jwtService.extractEmail(pathDTO.getToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for (PlaceIdDTO placeIdDTO : pathDTO.getPlacesIds()) {
            Optional<Place> existingPlace = placeRepository.findByplaceID(placeIdDTO.getLocation_id());
            if (existingPlace.isEmpty()) {
                Place place = new Place();
                place.setPlaceID(placeIdDTO.getLocation_id());
                placeRepository.save(place);
            }
        }

        List<String> placeIds = pathDTO.getPlacesIds().stream()
                .map(PlaceIdDTO::getLocation_id)
                .toList();

        List<Place> places = placeRepository.findAllByPlaceIDIn(placeIds);

        Path newPath = new Path();
        newPath.setName(pathDTO.getName());
        newPath.setCity(pathDTO.getCity());
        newPath.setCountry(pathDTO.getCountry());
        newPath.setUser(user);
        newPath.setStars(0f);
        newPath.setImage(pathDTO.getImage());

        // Link the places with the new path (both sides)
        for (Place place : places) {
            List<Path> placePaths = place.getPaths();
            if (placePaths == null) {
                placePaths = new ArrayList<>();
                place.setPaths(placePaths);
            }
            if (!placePaths.contains(newPath)) {
                placePaths.add(newPath);
            }
        }
        newPath.setPlaces(places);

        System.out.println(newPath);

        Path savedPath = pathRepository.save(newPath);
        return savedPath.getName();
    }


    public List<PathGetDTO> getPaths(PathGetWithIsCompleteDTO pathGetWithIsCompleteDTO) {
        String email = jwtService.extractEmail(pathGetWithIsCompleteDTO.getToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Path> pathEntities = pathRepository.findAllByUserAndIsComplete(user, pathGetWithIsCompleteDTO.getIsComplete());

        List<PathGetDTO> pathDTOs = new ArrayList<>();

        for (Path path : pathEntities) {
            PathGetDTO dto = new PathGetDTO();
            dto.setId(path.getId());
            dto.setName(path.getName());
            dto.setCity(path.getCity());
            dto.setCountry(path.getCountry());
            dto.setStars(path.getStars());
            dto.setImage(path.getImage());

            pathDTOs.add(dto);
        }

        return pathDTOs;
    }

    public PathGetWithPlacesDTO getPath(IdDTO idDTO) {

        List<PlaceIdDTO> placeIdDTOS = pathRepository.findTripadvisorPlaceIdsByPathId(idDTO.getId());

        Optional<Path> path = pathRepository.findById(idDTO.getId());

        PathGetWithPlacesDTO dto = new PathGetWithPlacesDTO();

        for (PlaceIdDTO id : placeIdDTOS) {
            dto.getPlaces().add(id);
        }

        dto.setId(path.get().getId());
        dto.setName(path.get().getName());
        dto.setCity(path.get().getCity());
        dto.setCountry(path.get().getCountry());
        dto.setStars(path.get().getStars());
        dto.setImage(path.get().getImage());

        return dto;
    }


    @Transactional
    public void deletePathById(Integer id) {
        if (!pathRepository.existsById(id)) {
            throw new RuntimeException("Path with id " + id + " not found");
        }
        pathRepository.deleteById(id);
    }

    @Transactional
    public boolean updateIsComplete(Integer pathId, Integer isComplete) {
        int updatedRows = pathRepository.updateIsCompleteById(pathId, isComplete);
        return updatedRows > 0;
    }

    public List<PathGetDTO> getAllPaths() {
        List<Path> paths = pathRepository.findTop10ByOrderByIdAsc();
        List<PathGetDTO> pathDTOs = new ArrayList<>();
        for (Path path : paths) {
            PathGetDTO dto = new PathGetDTO();
            dto.setId(path.getId());
            dto.setName(path.getName());
            dto.setCity(path.getCity());
            dto.setCountry(path.getCountry());
            dto.setStars(path.getStars());
            dto.setImage(path.getImage());
            pathDTOs.add(dto);
        }
        return pathDTOs;
    }


}
