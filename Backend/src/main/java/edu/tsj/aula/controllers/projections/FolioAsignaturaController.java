package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.service.projections.folio.asignatura.IFolioAsignaturaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class FolioAsignaturaController {
    private final IFolioAsignaturaService folioAsignaturaService;

    @PostMapping("/folio_asignatura/{id_unidad}")
    @ResponseStatus(HttpStatus.CREATED)
    public FolioAsignaturaEntity createFolioAsignatura(@RequestBody FolioAsignaturaEntity folioAsignaturaEntity,
                                                       @PathVariable Long id_unidad) {
        return folioAsignaturaService.createFolioAsignatura(folioAsignaturaEntity, id_unidad);
    }

    @GetMapping("/folios_asignatura_by_unidad/{id_unidad}")
    public List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidad(@PathVariable Long id_unidad) {
        return folioAsignaturaService.getAllFoliosAsignaturaByUnidadAcademica(id_unidad);
    }

    @GetMapping(value = "/folios_asignatura")
    public List<FolioAsignaturaEntity> getAllFoliosAsignatura() {
        return folioAsignaturaService.getAllFoliosAsignatura();
    }
}
