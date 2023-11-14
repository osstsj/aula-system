package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.service.projections.fulltime.IFulltimeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ProyeccionFulltimeController {
    private final IFulltimeService fulltimeService;

    @PostMapping(value = "/fulltime/folio/{id_folio}/unidad/{id_unidad}/docente/{id_docente}/carrera/{id_carrera}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public FullTimeEntity createProyeccionFulltime(@RequestBody FullTimeEntity fullTimeDto,
                                                   @PathVariable Long id_folio, @PathVariable Long id_unidad,
                                                   @PathVariable Long id_docente, @PathVariable Long id_carrera) {
        return fulltimeService.createFulltime(fullTimeDto, id_folio, id_unidad, id_docente, id_carrera);
    }

    @GetMapping(value = "/fulltime/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public FullTimeEntity getProyeccionFulltimeById(@PathVariable Long id) {
        return fulltimeService.getFulltimeById(id);
    }

    @GetMapping(value = "/fulltime_by_folio/{id_folio}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public List<FullTimeEntity> getAllProyeccionesFulltimeByFolioId(@PathVariable Long id_folio) {
       return fulltimeService.findAllByFolioById(id_folio);
    }
}
