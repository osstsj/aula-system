package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;

import java.util.HashMap;
import java.util.List;


public interface IDocenteService {

    DocenteResponseDto createDocente(DocenteRequestDto docenteRequestDto, Long id_unidad);

    List<DocenteResponseDto> getAllDocentes();

    List<DocenteResponseDto> getAllDocentesByPTCAsignaturandUnidadId(Long id_unidad);

    List<DocenteResponseDto> getAllDocentesByPTCFulltimeAndUnidadId(Long id_unidad);

    List<DocenteResponseDto> findAllDocentesByUnidad(Long id_unidad);

    DocenteResponseDto getDocenteById(Long id);

    DocenteResponseDto updateDocenteById(Long id, Long id_unidad, DocenteRequestDto docenteRequestDto);

    HashMap<String, String> deleteDocenteById(Long id);

    Boolean checkDocenteDependers(Long id_unidad);
}
