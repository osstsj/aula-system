package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface IUnidadService {
//    PlantelResponseDto createPlantel(PlantelRequestDto plantelRequestDto);
//
//    List<PlantelResponseDto> getAllPlanteles();
//
//    PlantelResponseDto getPlantelById(Long id);
//
//    PlantelResponseDto updatePlantelById(Long id, PlantelRequestDto plantelUpdateRequestDto);
//
//    HashMap<String, String> deletePlantelById(Long id);

    UnidadEntity createUnidad(UnidadEntity plantelRequestDto);

    List<UnidadEntity> getAllUnidades();

    Optional<UnidadEntity> getUnidadById(Long id);

    UnidadEntity updateUnidadById(Long id, UnidadEntity plantelUpdateRequestDto);

    HashMap<String, String> deleteUnidadById(Long id);
}
