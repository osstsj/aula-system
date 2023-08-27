package edu.tsj.aula.service;

import edu.tsj.aula.model.PlantelEntity;

import java.util.List;
import java.util.Optional;

public interface IPlantelService {
    PlantelEntity savePlantel(PlantelEntity plantelEntity);

    List<PlantelEntity> getAllPlanteles();

    Optional<PlantelEntity> getPlantelById(Long id);

    PlantelEntity updatePlantel(PlantelEntity plantelEntity);

    void deletePlantelById(Long id);
}
