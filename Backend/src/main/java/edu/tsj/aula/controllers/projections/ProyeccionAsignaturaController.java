package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.service.projections.asignatura.IAsignaturaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ProyeccionAsignaturaController {
    private final IAsignaturaService asignaturaService;

    @PostMapping("/asignatura/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera}")
    @ResponseStatus(HttpStatus.CREATED)
    public AsignaturaEntity createProyeccionAsignatura(@RequestBody AsignaturaEntity asignaturaRequestDto,
                                                       @PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                       @PathVariable Long id_docente, @PathVariable Long id_carrera) {
        return asignaturaService.createAsignatura(asignaturaRequestDto, id_folio, id_unidad, id_docente, id_carrera);
    }

    @GetMapping(value = "/asignatura/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public AsignaturaEntity getProyeccionAsignaturaById(@PathVariable Long id) {
        return asignaturaService.getAsignaturaById(id);
    }

    @PutMapping("/asignatura/{id_asignatura}/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera}")
    @ResponseStatus(HttpStatus.CREATED)
    public AsignaturaEntity updateProyeccionAsignatura(@RequestBody AsignaturaEntity asignaturaRequestDto,
                                                       @PathVariable Long id_asignatura,@PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                       @PathVariable Long id_docente, @PathVariable Long id_carrera) {
        return asignaturaService.updateAsignatura(asignaturaRequestDto, id_asignatura, id_folio, id_unidad, id_docente, id_carrera);
    }

    @DeleteMapping(value = "/asignatura/{id}")
    public HashMap<String, String> deleteAsignaturaById(@PathVariable Long id) {
//        try {
            HashMap<String, String> response = asignaturaService.deleteAsignaturaById(id);
//            if (response != null) {
////                return ResponseEntity.ok(response);
//            }
//            return ResponseEntity.notFound().build();
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
        return response;
    }

    @GetMapping(value = "/asignaturas_by_folio/{id_folio}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public List<AsignaturaEntity> getAllProyeccionesAsignaturaByFolioId(@PathVariable Long id_folio) {
            return asignaturaService.findAllByFolioById(id_folio);
    }

}
