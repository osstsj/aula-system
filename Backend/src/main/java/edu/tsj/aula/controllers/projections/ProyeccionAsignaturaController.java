package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaRequestDto;
import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaResponseDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.service.projections.asignatura.IAsignaturaService;
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
public class ProyeccionAsignaturaController {
    private final IAsignaturaService asignaturaService;
    @PostMapping(value="/asignatura/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera_por_unidad}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<AsignaturaEntity> createProyeccionAsignatura(@Valid @RequestBody AsignaturaEntity asignaturaEntity,
                                                                            @PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                                            @PathVariable Long id_docente, @PathVariable Long id_carrera_por_unidad) {
        try {
            var result = asignaturaService.createAsignatura(asignaturaEntity, id_folio, id_unidad, id_docente, id_carrera_por_unidad);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/asignatura/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<AsignaturaEntity> getProyeccionAsignaturaById(@PathVariable Long id) {
        try {
            var result = asignaturaService.getAsignaturaById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @GetMapping(value = "/asignaturas_by_folio/{id_folio}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<AsignaturaEntity>> getAllProyeccionesAsignaturaByFolioId(@PathVariable Long id_folio) {
        try {
            var result = asignaturaService.findAllByFolioById(id_folio);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping(value="/asignatura/{id_asignatura}/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera_por_unidad}",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AsignaturaEntity> updateProyeccionAsignatura(@Valid @RequestBody AsignaturaEntity asignaturaEntity,
                                                       @PathVariable Long id_asignatura,@PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                       @PathVariable Long id_docente, @PathVariable Long id_carrera_por_unidad) {
        try {
            var result = asignaturaService.updateAsignatura(asignaturaEntity, id_asignatura, id_folio, id_unidad, id_docente, id_carrera_por_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/asignatura/{id}")
    public ResponseEntity<HashMap<String, String>> deleteAsignaturaById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = asignaturaService.deleteAsignaturaById(id);
            if (response != null) {
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
