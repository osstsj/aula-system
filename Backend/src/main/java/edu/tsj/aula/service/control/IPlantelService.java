package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.UnidadAcademicaEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface IPlantelService {
//    PlantelResponseDto createPlantel(PlantelRequestDto plantelRequestDto);
//
//    List<PlantelResponseDto> getAllPlanteles();
//
//    PlantelResponseDto getPlantelById(Long id);
//
//    PlantelResponseDto updatePlantelById(Long id, PlantelRequestDto plantelUpdateRequestDto);
//
//    HashMap<String, String> deletePlantelById(Long id);

    UnidadAcademicaEntity createPlantel(UnidadAcademicaEntity plantelRequestDto);

    List<UnidadAcademicaEntity> getAllPlanteles();

    Optional<UnidadAcademicaEntity> getPlantelById(Long id);

    UnidadAcademicaEntity updatePlantelById(Long id, UnidadAcademicaEntity plantelUpdateRequestDto);

    HashMap<String, String> deletePlantelById(Long id);
}
