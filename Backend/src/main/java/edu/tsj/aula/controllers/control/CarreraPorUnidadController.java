package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;
import edu.tsj.aula.service.control.ICarreraPorUnidadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class CarreraPorUnidadController {
    private final ICarreraPorUnidadService carreraPorUnidadService;

    @PostMapping(value="/carreraPorUnidad/{id_unidad}/{id_carrera}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CarreraPorUnidadResponseDto> createCarreraPorUnidad(
            @Valid @RequestBody CarreraPorUnidadRequestDto carreraPorUnidadRequestDto,
            @PathVariable Long id_unidad, @PathVariable Long id_carrera) {
        try {
            var result = carreraPorUnidadService.createCarreraPorUnidad(carreraPorUnidadRequestDto, id_unidad, id_carrera);
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

    @GetMapping(value="/carreraPorUnidad_by_id_unidad/{id_unidad}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<CarreraPorUnidadResponseDto>> getCarreraPorUnidadEntitiesByUnidad_academicaId(@PathVariable Long id_unidad) {
        try {
            var result = carreraPorUnidadService.getCarreraPorUnidadEntitiesByUnidad_academicaId(id_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        @GetMapping(value="/carrerasPorUnidad_dependers/{id}")
    public ResponseEntity<Boolean> checkCarreraPorUnidadById(@PathVariable Long id) {
        try {
            var result = carreraPorUnidadService.checkCarreraPorUnidadById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/carreraPorUnidad/{id}/{id_unidad}/{id_carrera}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraPorUnidadResponseDto> updateCarreraPorUnidadById(
            @PathVariable Long id, @Valid @RequestBody CarreraPorUnidadRequestDto carreraPorUnidadRequestDto,
            @PathVariable Long id_unidad, @PathVariable Long id_carrera) {
        try {
            var result = carreraPorUnidadService.updateCarreraPorUnidadById(id, carreraPorUnidadRequestDto, id_unidad, id_carrera);
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
