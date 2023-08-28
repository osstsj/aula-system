package edu.tsj.aula.controller;

import edu.tsj.aula.model.CarreraPorUnidadEntity;
import edu.tsj.aula.service.implementation.CarreraPorUnidadServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class CarreraPorUnidadController {
    private final CarreraPorUnidadServiceImpl carreraPorUnidadService;

    @PostMapping("/carreraPorUnidad")
    @ResponseStatus(HttpStatus.CREATED)
    public CarreraPorUnidadEntity createCarreraPorUnidad(@RequestBody CarreraPorUnidadEntity carreraPorUnidadEntity) {
        return carreraPorUnidadService.saveCarreraPorUnidad(carreraPorUnidadEntity);
    }

    @GetMapping("/carrerasPorUnidad")
    public List<CarreraPorUnidadEntity> getAllCarrerasPorUnidad() {
        return carreraPorUnidadService.getAllCarreraPorUnidad();
    }

    @GetMapping("/carreraPorUnidad/{id}")
    public ResponseEntity<CarreraPorUnidadEntity> getCarreraPorUnidadById(@PathVariable Long id) {
        return carreraPorUnidadService.getCarreraPorUnidadById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/carreraPorUnidad/{id}")
    public ResponseEntity<CarreraPorUnidadEntity> updateCarreraPorUnidad(@PathVariable Long id, @RequestBody CarreraPorUnidadEntity carreraPorUnidadEntity) {
        return carreraPorUnidadService.getCarreraPorUnidadById(id)
                .map(auxCarreraPorUnidad -> {
                    auxCarreraPorUnidad.setCarreraEntitiesList(carreraPorUnidadEntity.getCarreraEntitiesList());
                    auxCarreraPorUnidad.setNivel(carreraPorUnidadEntity.getNivel());
                    auxCarreraPorUnidad.setPlantelEntities(carreraPorUnidadEntity.getPlantelEntities());
                    auxCarreraPorUnidad.setModalidad(carreraPorUnidadEntity.getModalidad());

                    CarreraPorUnidadEntity updateCarreraPorUnidad = carreraPorUnidadService.updateCarreraPorUnidad(auxCarreraPorUnidad);

                    return new ResponseEntity<>(updateCarreraPorUnidad, HttpStatus.OK);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/carreraPorUnidad/{id}")
    public ResponseEntity<String> deleteCarreraPorUnidad(@PathVariable Long id) {
        carreraPorUnidadService.deleteCarreraPorUnidadById(id);

        return new ResponseEntity<>(String.format("La Carrera por unidad academica con el id: %s ha sido eliminado con exito.",id),
                HttpStatus.NO_CONTENT);
    }
}
