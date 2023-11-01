package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;


public interface IDocenteService {
//    DocenteResponseDto createDocente(DocenteRequestDto docenteRequestDto);
//
//    List<DocenteResponseDto> getAllDocentes();
//
//    DocenteResponseDto getDocenteById(Long id);
//
//    DocenteResponseDto updateDocenteById(Long id, DocenteRequestDto docenteRequestDto);
//
//    HashMap<String, String> deleteDocenteById(Long id);

    DocenteEntity createDocente(DocenteEntity docenteRequestDto, Long plantel_id);

    List<DocenteEntity> getAllDocentes();

    List<DocenteEntity> findAllByPlantel(List<PlantelEntity> plantel);

    DocenteEntity getDocenteById(Long id);

    DocenteEntity updateDocenteById(Long id, DocenteEntity docenteRequestDto);

    HashMap<String, String> deleteDocenteById(Long id);
}
