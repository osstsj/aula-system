package edu.tsj.aula.service.implementation;

import edu.tsj.aula.model.Plantel;
import edu.tsj.aula.repository.PlantelRepository;
import edu.tsj.aula.service.IPlantelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PlantelService implements IPlantelService {
    @Override
    public Plantel savePlantel(Plantel plantel) {
        return null;
    }

    @Override
    public List<Plantel> getAllPlantels() {
        return null;
    }

    @Override
    public Optional<Plantel> getPlantelById(Long id) {
        return Optional.empty();
    }

    @Override
    public Plantel updatePlantel(Plantel plantel) {
        return null;
    }

    @Override
    public void deletePlantel(Long id) {

    }
}
