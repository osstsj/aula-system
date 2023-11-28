package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.service.projections.folio.fulltime.IFolioFulltimeService;
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
public class FolioFulltimeController {
    private final IFolioFulltimeService folioFulltimeService;

    @PostMapping(value ="/folio_fulltime/{id_unidad}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<FolioFulltimeEntity> craeteFolioFulltime(@RequestBody FolioFulltimeEntity folioFulltimeEntity,
                                                                  @PathVariable Long id_unidad) {
        try {
            var result = folioFulltimeService.createFolioFulltime(folioFulltimeEntity, id_unidad);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value ="/folios_fulltime_by_unidad/{id_unidad}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<FolioFulltimeEntity>> gettAllFoliosFulltimeByUnidad(@PathVariable Long id_unidad) {
        try {
            var result = folioFulltimeService.getAllByFoliosAndUnidadAcademica(id_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/folios_fulltime_get_secuencia/{id_unidad}/{periodo}/{AoB}")
    public ResponseEntity<Integer> getSecuenciaNumero(@PathVariable Long id_unidad,
                                      @PathVariable Integer periodo,
                                      @PathVariable String AoB) {
        try {
            var result = folioFulltimeService.getSecuenciaNumeroFulltime(id_unidad, periodo, AoB);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/folio_fulltime/{id_folio}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<FolioFulltimeEntity> getFolioById(@PathVariable Long id_folio) {
        try {
            var result = folioFulltimeService.getFolioById(id_folio);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value ="/folios_fulltime",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<FolioFulltimeEntity>> getAllFoliosFulltime() {
        try {
            var result = folioFulltimeService.getAllFoliosFulltime();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/folios_fulltime_check_dependers/{id}")
    public ResponseEntity<Boolean> checkFolioFulltimeDependers(@PathVariable Long id) {
        try {
           var result = folioFulltimeService.checkFolioFulltimeDependers(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping ("/folio_fulltime/{id}")
    public ResponseEntity<HashMap<String, String>> deleteFolioFulltimeById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = folioFulltimeService.deleteFolioFulltimeById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
