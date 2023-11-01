package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.plantelDto.PlantelRequestDto;
import edu.tsj.aula.persistance.models.control.dto.plantelDto.PlantelResponseDto;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import edu.tsj.aula.service.control.IPlantelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PlantelController {
    private final IPlantelService plantelService;
    @PostMapping(value="/plantel",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<PlantelEntity> createPlantel(@Valid @RequestBody PlantelEntity plantelRequestDto) {
        try {
            var result = plantelService.createPlantel(plantelRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/planteles",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<PlantelEntity>> getAllPlanteles() {
        try {
            List<PlantelEntity> planteles = plantelService.getAllPlanteles();
            return new ResponseEntity<>(planteles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @GetMapping(value="/plantel/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public Optional<PlantelEntity> getPlantelById(@PathVariable Long id) {
       return plantelService.getPlantelById(id);
    }
    @PutMapping(value="/plantel/{id}",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<PlantelEntity> updatePlantelById(@PathVariable Long id, @Valid @RequestBody PlantelEntity plantelUpdateRequestDto) {
        try {
            var result = plantelService.updatePlantelById(id, plantelUpdateRequestDto);
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


