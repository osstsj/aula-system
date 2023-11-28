package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.service.projections.folio.asignatura.IFolioAsignaturaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class FolioAsignaturaController {
    private final IFolioAsignaturaService folioAsignaturaService;

    @PostMapping(value = "/folio_asignatura/{id_unidad}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<FolioAsignaturaEntity> createFolioAsignatura(@RequestBody FolioAsignaturaEntity folioAsignaturaEntity,
                                                       @PathVariable Long id_unidad) {
        try {
            var result = folioAsignaturaService.createFolioAsignatura(folioAsignaturaEntity, id_unidad);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping(value = "/folios_asignatura_by_unidad/{id_unidad}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<FolioAsignaturaEntity>> getAllFoliosAsignaturaByUnidad(@PathVariable Long id_unidad) {
        try {
            var result = folioAsignaturaService.getAllFoliosAsignaturaByUnidadAcademica(id_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/folios_asignatura_get_secuencia/{id_unidad}/{periodo}/{AoB}")
    public ResponseEntity<Integer> getSecuenciaNumero(@PathVariable Long id_unidad,
                                                                      @PathVariable Integer periodo,
                                                                      @PathVariable String AoB) {
        try {
            var result = folioAsignaturaService.getSecuenciaNumeroAsignatura(id_unidad, periodo, AoB);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/folio_asignatura/{id_folio}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public FolioAsignaturaEntity getFolioById(@PathVariable Long id_folio) {
        return folioAsignaturaService.getFolioById(id_folio);
    }

    @GetMapping(value = "/folios_asignatura",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<FolioAsignaturaEntity>> getAllFoliosAsignatura() {
        try {
            var result = folioAsignaturaService.getAllFoliosAsignatura();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/folios_asignatura_check_dependers/{id}")
    public ResponseEntity<Boolean> checkFolioAsignaturaDependers(@PathVariable Long id) {
        try {
            var result = folioAsignaturaService.checkFolioAsignaturaDependers(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping ("/folio_asignatura/{id}")
    public ResponseEntity<HashMap<String, String>> deleteFolioAsignaturaById(@PathVariable Long id) {
        try {
           HashMap<String, String> response = folioAsignaturaService.deleteFolioAsignaturaById(id);
           if (response != null)
               return ResponseEntity.ok(response);
           return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
