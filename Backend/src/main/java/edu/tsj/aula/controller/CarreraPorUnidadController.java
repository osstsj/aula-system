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

    @GetMapping("/carrerasPorUnidad/{id}")
    public ResponseEntity<CarreraPorUnidadEntity> getCarreraPorUnidadById(@PathVariable Long id) {
        return carreraPorUnidadService.getCarreraPorUnidadById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
}
