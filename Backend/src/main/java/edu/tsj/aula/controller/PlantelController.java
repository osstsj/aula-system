package edu.tsj.aula.controller;

import edu.tsj.aula.model.PlantelEntity;
import edu.tsj.aula.service.implementation.PlantelServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PlantelController {
    private final PlantelServiceImpl plantelServiceImpl;

    @PostMapping("/plantel")
    @ResponseStatus(HttpStatus.CREATED)
    public PlantelEntity createPlantel(@RequestBody PlantelEntity plantelEntity) {
        return plantelServiceImpl.savePlantel(plantelEntity);
    }

    @GetMapping("/planteles")
    public List<PlantelEntity> getAllPlanteles() {
        return plantelServiceImpl.getAllPlanteles();
    }

    @GetMapping("/plantel/{id}")
    public ResponseEntity<PlantelEntity> getPlantelById(@PathVariable Long id) {
        return plantelServiceImpl.getPlantelById(id)
                .map(ResponseEntity::ok)
                .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PutMapping("/plantel/{id}")
    public ResponseEntity<PlantelEntity> updatePlantel(@PathVariable Long id, @RequestBody PlantelEntity plantelEntity) {
        return plantelServiceImpl.getPlantelById(id)
                .map(auxPlantel -> {
                    auxPlantel.setTipoUnidad(plantelEntity.getTipoUnidad());
                    auxPlantel.setClave_dgp(plantelEntity.getClave_dgp());
                    auxPlantel.setAbreviatura(plantelEntity.getAbreviatura());
                    auxPlantel.setNombreCorto(plantelEntity.getNombreCorto());
                    auxPlantel.setNombreCompleto(plantelEntity.getNombreCompleto());
                    auxPlantel.setNombre_extension(plantelEntity.getNombre_extension());
                    auxPlantel.setDireccionCompleta(plantelEntity.getDireccionCompleta());
                    auxPlantel.setFechaCreacion(auxPlantel.getFechaCreacion());

                    PlantelEntity updatePlantelEntity = plantelServiceImpl.updatePlantel(auxPlantel);

                    return new ResponseEntity<>(updatePlantelEntity, HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/plantel/{id}")
    public ResponseEntity<String> deletePlantel(@PathVariable Long id) {
        plantelServiceImpl.deletePlantelById(id);

        return new ResponseEntity<>(String.format("Plantel con el id '{0}' ha sido eliminado con exito!", id),
                HttpStatus.NO_CONTENT);
    }
}
