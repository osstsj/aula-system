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
    
}
