package edu.tsj.aula.controller;

import edu.tsj.aula.model.Plantel;
import edu.tsj.aula.service.implementation.PlantelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PlantelController {
    private final PlantelService plantelService;

    @PostMapping("/plantel")
    @ResponseStatus(HttpStatus.CREATED)
    public Plantel createPlantel(@RequestBody Plantel plantel) {
        return plantelService.savePlantel(plantel);
    }

    @GetMapping("/planteles")
    public List<Plantel> getAllPlanteles() {
        return plantelService.getAllPlanteles();
    }

    @GetMapping("/plantel/{id}")
    public ResponseEntity<Plantel> getPlantelById(@PathVariable Long id) {
        return plantelService.getPlantelById(id)
                .map(ResponseEntity::ok)
                .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PutMapping("/plantel/{id}")
    public ResponseEntity<Plantel> updatePlantel(@PathVariable Long id, @RequestBody Plantel plantel) {
        return plantelService.getPlantelById(id)
                .map(auxPlantel -> {
                    auxPlantel.setTipoUnidad(plantel.getTipoUnidad());
                    auxPlantel.setClave_dgp(plantel.getClave_dgp());
                    auxPlantel.setAbreviatura(plantel.getAbreviatura());
                    auxPlantel.setNombreCorto(plantel.getNombreCorto());
                    auxPlantel.setNombreCompleto(plantel.getNombreCompleto());
                    auxPlantel.setNombre_extension(plantel.getNombre_extension());
                    auxPlantel.setDireccionCompleta(plantel.getDireccionCompleta());
                    auxPlantel.setFechaCreacion(auxPlantel.getFechaCreacion());

                    Plantel updatePlantel = plantelService.updatePlantel(auxPlantel);

                    return new ResponseEntity<>(updatePlantel, HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/plantel/{id}")
    public ResponseEntity<String> deletePlantel(@PathVariable Long id) {
        plantelService.deletePlantelById(id);

        return new ResponseEntity<>(String.format("Plantel con el id '{0}' ha sido eliminado con exito!", id),
                HttpStatus.NO_CONTENT);
    }
}
