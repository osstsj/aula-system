package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.service.control.ICarreraService;
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
public class CarreraController {
    private final ICarreraService carreraService;

//    @PostMapping(value="/carrera",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
//            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<CarreraResponseDto> createCarrera(@Valid @RequestBody CarreraRequestDto carreraRequestDto) {
//        try {
//            var result = carreraService.createCarrera(carreraRequestDto);
//            return new ResponseEntity<>(result, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping(value="/carrera",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraEntity> createCarrera(@Valid @RequestBody CarreraEntity carreraRequestDto) {
        try {
            var result = carreraService.createCarrera(carreraRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/carreras",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<CarreraResponseDto>> getAllCarreras() {
       try {
           List<CarreraResponseDto> carreras = carreraService.getAllCarreras();
           return new ResponseEntity<>(carreras, HttpStatus.OK);
       } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @GetMapping(value="/carrera/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraResponseDto> getCarreraById(@PathVariable Long id) {
        try {
            var result = carreraService.getCarreraById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/carrera/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<CarreraResponseDto> updateCarreraById(@PathVariable Long id, @Valid @RequestBody CarreraRequestDto carreraRequestDto) {
        try {
            var result = carreraService.updateCarreraById(id, carreraRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/carrera/{id}")
    public ResponseEntity<HashMap<String, String>> deleteCarreraById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = carreraService.deleteCarreraById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping(value="/carrera/{plan_estudio}",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<CarreraResponseDto> getCarreraByPlanEstudio(@PathVariable String plan_estudio) {
//        try {
//            var result = carreraService.getCarreraByPlanEstudio(plan_estudio);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
