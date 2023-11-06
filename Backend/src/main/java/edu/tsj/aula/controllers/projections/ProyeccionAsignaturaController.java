package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.service.projections.asignatura.IAsignaturaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ProyeccionAsignaturaController {
    private final IAsignaturaService asignaturaService;

//    @PostMapping("/asignatura")
//    @ResponseStatus(HttpStatus.CREATED)
//    public AsignaturaResponseDto createProyeccionAsignatura(@RequestBody AsignaturaRequestDto asignaturaRequestDto) {
//        return asignaturaService.createAsignatura(asignaturaRequestDto);
//    }


    @PostMapping("/asignatura/{id_folio}/{id_unidad}")
    @ResponseStatus(HttpStatus.CREATED)
    public AsignaturaEntity createProyeccionAsignatura(@RequestBody AsignaturaEntity asignaturaRequestDto,
                                                       @PathVariable Long id_folio, @PathVariable Long id_unidad) {
        return asignaturaService.createAsignatura(asignaturaRequestDto, id_folio, id_unidad);
    }

    @GetMapping(value = "/asignatura/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public AsignaturaEntity getProyeccionesAsignaturaById(@PathVariable Long id) {
        return asignaturaService.getAsignaturaById(id);
    }

    @GetMapping(value = "/asignaturas",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public List<AsignaturaEntity> getProyeccionesAsignatura() {
        return asignaturaService.getAsignaturas();
    }

    @GetMapping(value = "/asignaturas_by_folio_and_unidad/{id_folio}/{id_unidad}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public List<AsignaturaEntity> getAllByUnidadAcademica(@PathVariable Long id_folio, @PathVariable Long id_unidad) {
            return asignaturaService.findAllByFolioAndUnidad(id_folio, id_unidad);
    }

        @GetMapping(value = "/asignaturas_by_folio/{id_folio}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public List<AsignaturaEntity> getAllByFolioId(@PathVariable Long id_folio) {
            return asignaturaService.findAllByFolioId(id_folio);
    }

}
