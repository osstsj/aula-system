package edu.tsj.aula.service.implementation;

import edu.tsj.aula.exception.ResourceNotFoundException;
import edu.tsj.aula.model.Plantel;
import edu.tsj.aula.repository.PlantelRepository;
import edu.tsj.aula.service.IPlantelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class PlantelService implements IPlantelService {
    private final PlantelRepository plantelRepository;

    @Transactional
    @Override
    public Plantel savePlantel(Plantel plantel) {
        Optional<Plantel> checkPlantel = plantelRepository.findByNombreCompleto(plantel.getNombreCompleto());
        if (checkPlantel.isPresent()) {
            log.error(String.format("El plantel se encuentra registrado con el id %s y nombre: %s", plantel.getId(), plantel.getNombreCorto()));
            //return (Plantel) ResponseEntity.status(HttpStatus.CONFLICT);
            // Iterar cada propiedad del plantel parra descartar duplicados y emitir una excepciom para que sea
            // recibido al frontend
        }

        return plantelRepository.save(plantel);
    }

    @Transactional
    @Override
    public List<Plantel> getAllPlanteles() {
        log.debug("Se ha ejecutado el metodo gettAllPlanteles");
        return plantelRepository.findAll();
    }

    @Transactional
    @Override
    public Optional<Plantel> getPlantelById(Long id) {
        Optional<Plantel> plantel = plantelRepository.findById(id);
        if(plantel.isEmpty())
            throw new ResourceNotFoundException(String.format("No se encontro plantel con id {0}", id), HttpStatus.NOT_FOUND);

        return plantel;
    }

    @Transactional
    @Override
    public Plantel updatePlantel(Plantel plantel) {
        log.debug(String.format("Plantel con el id {0} ha sido eliminado!", plantel.getId()));
        return plantelRepository.save(plantel);
    }

    @Transactional
    @Override
    public void deletePlantelById(Long id) {
        log.debug(String.format("Plantel con el id {0} ha sido eliminado!", id));
        plantelRepository.deleteById(id);
    }
}
