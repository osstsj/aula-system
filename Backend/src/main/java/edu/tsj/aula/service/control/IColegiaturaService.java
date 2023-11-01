package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaResponseDto;

import java.util.HashMap;
import java.util.List;

public interface IColegiaturaService {
    ColegiaturaResponseDto createColegiatura(ColegiaturaRequestDto colegiaturaRequestDto);

    List<ColegiaturaResponseDto> getAllColegiaturas();

    ColegiaturaResponseDto getColegiaturaById(Long id);

    ColegiaturaResponseDto updateColegiaturaById(Long id, ColegiaturaRequestDto colegiaturaRequestDto);

    HashMap<String, String> deleteColegiaturaById(Long id);


}
