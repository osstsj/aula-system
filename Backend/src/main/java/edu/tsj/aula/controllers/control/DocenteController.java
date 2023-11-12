package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.service.control.IDocenteService;
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

    @PostMapping(value="/docente/{id_unidad}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<DocenteResponseDto> createDocente(
            @Valid @RequestBody DocenteRequestDto docenteRequestDto, @PathVariable Long id_unidad) {
        try {
            var result = docenteService.createDocente(docenteRequestDto, id_unidad);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/docentes",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE })
    public ResponseEntity<List<DocenteResponseDto>> getAllDocentes() {
        try {
            List<DocenteResponseDto> docentes = docenteService.getAllDocentes();
            return new ResponseEntity<>(docentes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/docentes_by_ua/{id_unidad}")
    public ResponseEntity<List<DocenteResponseDto>> getDocentesByUnidadAcademicaId(@PathVariable Long id_unidad) {
        try {
            List<DocenteResponseDto> docentesByUnidad = docenteService.findAllDocentesByUnidad(id_unidad);
            return new ResponseEntity<>(docentesByUnidad, HttpStatus.OK);
        }  catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/docente/{id}",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<DocenteResponseDto> getDocenteById(@PathVariable Long id) {
        try {
            var result = docenteService.getDocenteById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/docente/{id}/{id_unidad}",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<DocenteResponseDto> updateDocenteById(@PathVariable Long id,@PathVariable Long id_unidad, @RequestBody DocenteRequestDto docenteRequestDto) {
        try {
            var result = docenteService.updateDocenteById(id, id_unidad, docenteRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/docente/{id}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<HashMap<String, String>> deleteDocenteById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = docenteService.deleteDocenteById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
