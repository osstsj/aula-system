package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;
import edu.tsj.aula.service.control.ICarreraPorUnidadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class CarreraPorUnidadController {
    private final ICarreraPorUnidadService carreraPorUnidadService;

    @PostMapping(value="/carreraPorUnidad",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CarreraPorUnidadResponseDto> createCarreraPorUnidad(
            @RequestBody CarreraPorUnidadRequestDto carreraPorUnidadRequestDto) {
        try {
            var result = carreraPorUnidadService.createCarreraPorUnidad(carreraPorUnidadRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/carrerasPorUnidad",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<CarreraPorUnidadResponseDto>> getAllCarrerasPorUnidad() {
        try {
            List<CarreraPorUnidadResponseDto> carrerasPorUnidad = carreraPorUnidadService.getAllCarrerasPorUnidad();
            return new ResponseEntity<>(carrerasPorUnidad, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/carreraPorUnidad/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraPorUnidadResponseDto> getCarreraPorUnidadById(@PathVariable Long id) {
        try {
            var result = carreraPorUnidadService.getCarreraPorUnidadById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/carreraPorUnidad/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraPorUnidadResponseDto> updateCarreraPorUnidadById(
            @PathVariable Long id, @RequestBody CarreraPorUnidadRequestDto carreraPorUnidadRequestDto) {
        try {
            var result = carreraPorUnidadService.updateCarreraPorUnidadById(id, carreraPorUnidadRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/carreraPorUnidad/{id}")
    public ResponseEntity<HashMap<String, String>> deleteCarreraPorUnidad(@PathVariable Long id) {
        try {
            HashMap<String, String> response = carreraPorUnidadService.deleteCarreraPorUnidadById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
