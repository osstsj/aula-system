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
    private final IFolioAsignaturaService proyeccionService;

    @PostMapping("/folio/{id_unidad}")
    @ResponseStatus(HttpStatus.CREATED)
    public FolioAsignaturaEntity createFolio(@RequestBody FolioAsignaturaEntity proyeccion, @PathVariable Long id_unidad) {
        return proyeccionService.createProyeccion(proyeccion, id_unidad);
    }

    @GetMapping("/folios_by_ua/{id_unidad}")
    public List<FolioAsignaturaEntity> getAllFoliosByUA(@PathVariable Long id_unidad) {
        return proyeccionService.findAllByUnidadAcademica(id_unidad);
    }

    @GetMapping(value = "/folios")
    public List<FolioAsignaturaEntity> getAllFolios() {
        return proyeccionService.getAllProyecciones();
    }
}
