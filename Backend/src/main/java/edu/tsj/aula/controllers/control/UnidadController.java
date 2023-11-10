package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.service.control.IUnidadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class UnidadController {
    private final IUnidadService unidadService;
    @PostMapping(value="/unidad",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<UnidadEntity> createUnidad(@Valid @RequestBody UnidadEntity unidadRequestDto) {
        try {
            var result = unidadService.createUnidad(unidadRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/unidades",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<UnidadEntity>> getAllUnidades() {
        try {
            List<UnidadEntity> unidades = unidadService.getAllUnidades();
            return new ResponseEntity<>(unidades, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @GetMapping(value="/unidad/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public Optional<UnidadEntity> getUnidadlById(@PathVariable Long id) {
       return unidadService.getUnidadById(id);
    }
    @PutMapping(value="/unidad/{id}",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<UnidadEntity> updateUnidadById(
            @PathVariable Long id, @Valid @RequestBody UnidadEntity unidadUpdateRequestDto) {
        try {
            var result = unidadService.updateUnidadById(id, unidadUpdateRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    }
//    @PostMapping(value="/plantel",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
//            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<PlantelResponseDto> createPlantel(@Valid @RequestBody PlantelRequestDto plantelRequestDto) {
//        try {
//            var result = plantelService.createPlantel(plantelRequestDto);
//            return new ResponseEntity<>(result, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping(value="/planteles",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<List<PlantelResponseDto>> getAllPlanteles() {
//        try {
//            List<PlantelResponseDto> planteles = plantelService.getAllPlanteles();
//            return new ResponseEntity<>(planteles, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping(value="/plantel/{id}",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<PlantelResponseDto> getPlantelById(@PathVariable Long id) {
//        try {
//            var result = plantelService.getPlantelById(id);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PutMapping(value="/plantel/{id}",
//            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
//            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<PlantelResponseDto> updatePlantelById(@PathVariable Long id, @Valid @RequestBody PlantelRequestDto plantelUpdateRequestDto) {
//        try {
//            var result = plantelService.updatePlantelById(id, plantelUpdateRequestDto);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @DeleteMapping("/plantel/{id}")
//    public ResponseEntity<HashMap<String, String>> deletePlantelById(@PathVariable Long id) {
//        try {
//            HashMap<String, String> response = plantelService.deletePlantelById(id);
//            if (response != null)
//                return ResponseEntity.ok(response);
//            return ResponseEntity.notFound().build();
//
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


