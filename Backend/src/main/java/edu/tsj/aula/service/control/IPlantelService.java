package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.plantelDto.PlantelRequestDto;
import edu.tsj.aula.persistance.models.control.dto.plantelDto.PlantelResponseDto;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;

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

    PlantelEntity createPlantel(PlantelEntity plantelRequestDto);

    List<PlantelEntity> getAllPlanteles();

    Optional<PlantelEntity> getPlantelById(Long id);

    PlantelEntity updatePlantelById(Long id, PlantelEntity plantelUpdateRequestDto);

    HashMap<String, String> deletePlantelById(Long id);
}
