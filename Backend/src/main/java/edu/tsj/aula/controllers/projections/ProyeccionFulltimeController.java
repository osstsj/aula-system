package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.service.projections.fulltime.IFulltimeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ProyeccionFulltimeController {
    private final IFulltimeService fulltimeService;

    @PostMapping(value = "/fulltime/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<FullTimeEntity> createProyeccionFulltime(@RequestBody FullTimeEntity fullTimeDto,
                                                   @PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                   @PathVariable Long id_docente, @PathVariable Long id_carrera) {
        try {
            var result = fulltimeService.createFulltime(fullTimeDto, id_folio, id_unidad, id_docente, id_carrera);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/fulltime/{id_fulltime}/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<FullTimeEntity> updateProyeccionFulltimeById(@RequestBody FullTimeEntity fullTimeDto, @PathVariable Long id_fulltime,
                                                   @PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                   @PathVariable Long id_docente, @PathVariable Long id_carrera) {
        try {
            var result = fulltimeService.updateFulltimeById(fullTimeDto, id_fulltime, id_folio, id_unidad, id_docente, id_carrera);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/fulltime/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<FullTimeEntity> getProyeccionFulltimeById(@PathVariable Long id) {
        try {
            var result = fulltimeService.getFulltimeById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/fulltime_by_folio/{id_folio}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<FullTimeEntity>> getAllProyeccionesFulltimeByFolioId(@PathVariable Long id_folio) {
        try {
            var result = fulltimeService.findAllByFolioById(id_folio);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping(value = "/fulltime/{id}")
    public ResponseEntity<HashMap<String, String>> deleteFulltimeById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = fulltimeService.deleteFulltimeById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
