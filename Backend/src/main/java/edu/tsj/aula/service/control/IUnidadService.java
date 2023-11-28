package edu.tsj.aula.service.control;


import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadResponseDto;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface IUnidadService {
    UnidadResponseDto createUnidad(UnidadRequestDto unidadRequestDto);

    List<UnidadResponseDto> getAllUnidades();

    UnidadResponseDto getUnidadById(Long id);

    UnidadResponseDto updateUnidadById(Long id, UnidadRequestDto unidadRequestDto);

    HashMap<String, String> deleteUnidadById(Long id);

    Boolean checkUnidadDependersByUnidadId(Long id_unidad);

}
