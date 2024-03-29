package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarRequestDto;
import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarResponseDto;

import java.util.HashMap;
import java.util.List;

public interface IAreaEscolarService {
    AreaEscolarResponseDto createAreaEscolar(AreaEscolarRequestDto areaEscolarRequestDto, Long id_unidad);

    List<AreaEscolarResponseDto> getAllAreasEscolares();

    AreaEscolarResponseDto getAreaEscolarById(Long id);

    AreaEscolarResponseDto updateAreaEscolar(Long id, AreaEscolarRequestDto areaEscolarRequestDto, Long id_unidad);

    HashMap<String, String> deleteAreaEscolarById(Long id);
}
