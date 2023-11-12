package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.service.control.IUnidadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class UnidadController {
    private final IUnidadService unidadService;


    @PostMapping(value = "/unidad",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<UnidadResponseDto> createPlantel(@Valid @RequestBody UnidadRequestDto unidadRequestDto) {
        try {
            var result = unidadService.createUnidad(unidadRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/unidades",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<UnidadResponseDto>> getAllPlanteles() {
        try {
            List<UnidadResponseDto> planteles = unidadService.getAllUnidades();
            return new ResponseEntity<>(planteles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/unidad/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<UnidadResponseDto> getPlantelById(@PathVariable Long id) {
        try {
            var result = unidadService.getUnidadById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/unidad/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<UnidadResponseDto> updatePlantelById(@PathVariable Long id, @Valid @RequestBody UnidadRequestDto unidadRequestDto) {
        try {
            var result = unidadService.updateUnidadById(id, unidadRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/unidad/{id}")
    public ResponseEntity<HashMap<String, String>> deletePlantelById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = unidadService.deleteUnidadById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


