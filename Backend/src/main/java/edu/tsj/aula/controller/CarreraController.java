package edu.tsj.aula.controller;

import edu.tsj.aula.model.CarreraEntity;
import edu.tsj.aula.service.implementation.CarreraService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class CarreraController {
    private final CarreraService carreraService;

    @PostMapping("/carrera")
    @ResponseStatus(HttpStatus.CREATED)
    public CarreraEntity createCarrera(@RequestBody CarreraEntity carreraEntity) {
        return carreraService.saveCarrera(carreraEntity);
    }

    @GetMapping("/carreras")
    public List<CarreraEntity> getAllCarreras() {
        return carreraService.getAllCarreras();
    }

    @GetMapping("/carrera/{id}")
    public ResponseEntity<CarreraEntity> getCarreraById(@PathVariable Long id) {
        return carreraService.getCarreraById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/carrera/{id}")
    public ResponseEntity<CarreraEntity> updateCarrera(@PathVariable Long id, @RequestBody CarreraEntity carreraEntity) {
        return carreraService.getCarreraById(id)
                .map(auxCarrera -> {
                    auxCarrera.setAbreviatura(carreraEntity.getAbreviatura());
                    auxCarrera.setNombre(carreraEntity.getNombre());
                    auxCarrera.setDGP(carreraEntity.getDGP());
                    auxCarrera.setPlanDeEstudio(carreraEntity.getPlanDeEstudio());
                    auxCarrera.setEstatus(carreraEntity.getEstatus());

                    CarreraEntity updateCarrera = carreraService.updateCarrera(auxCarrera);

                    return new ResponseEntity<>(updateCarrera, HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/carrera/{id}")
    public ResponseEntity<String> deleteCarrera(@PathVariable Long id) {
        carreraService.deleteCarreraById(id);

        return new ResponseEntity<>(String.format("La carrera con el id: %s ha sido eliminada con exito!", id),
                HttpStatus.NO_CONTENT);
    }
}
