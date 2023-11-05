package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import edu.tsj.aula.service.control.ICarreraService;
import edu.tsj.aula.service.control.IDocenteService;
import edu.tsj.aula.service.control.IPlantelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class DocenteController {
    private final IDocenteService docenteService;
    private final IPlantelService plantelService;
    private final ICarreraService carreraService;

    @PostMapping(value="/docente/{plantel_id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<DocenteEntity> createDocente(@Valid @RequestBody DocenteEntity docenteRequestDto, @PathVariable Long plantel_id) {
        try {
            var result = docenteService.createDocente(docenteRequestDto, plantel_id);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/docentes",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE })
    public ResponseEntity<List<DocenteEntity>> getAllDocentes() {
        try {
            List<DocenteEntity> docentes = docenteService.getAllDocentes();
            return new ResponseEntity<>(docentes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @GetMapping(value = "/docente/{id}",
//        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<DocenteEntity> getDocenteById(@PathVariable Long id) {
//        try {
//            var result = docenteService.getDocenteById(id);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @PutMapping(value = "/docente/{id}",
//        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
//        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<DocenteEntity> updateDocenteById(@PathVariable Long id, @RequestBody DocenteEntity docenteRequestDto) {
//        try {
//            var result = docenteService.updateDocenteById(id, docenteRequestDto);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @DeleteMapping(value = "/docente/{id}",
//        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
//    public ResponseEntity<HashMap<String, String>> deleteDocenteById(@PathVariable Long id) {
//        try {
//            HashMap<String, String> response = docenteService.deleteDocenteById(id);
//            if (response != null)
//                return ResponseEntity.ok(response);
//            return ResponseEntity.notFound().build();
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}
