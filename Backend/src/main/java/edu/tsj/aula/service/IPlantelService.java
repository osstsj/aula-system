package edu.tsj.aula.service;

import edu.tsj.aula.model.Plantel;

import java.util.List;
import java.util.Optional;

public interface IPlantelService {
    Plantel savePlantel(Plantel plantel);

    List<Plantel> getAllPlanteles();

    Optional<Plantel> getPlantelById(Long id);

    Plantel updatePlantel(Plantel plantel);

    void deletePlantelById(Long id);
}
