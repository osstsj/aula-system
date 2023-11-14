package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.service.projections.folio.fulltime.IFolioFulltimeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class FolioFulltimeController {
    private final IFolioFulltimeService folioFulltimeService;

    @PostMapping("/folio_fulltime/{id_unidad}")
    @ResponseStatus(HttpStatus.CREATED)
    public FolioFulltimeEntity craeteFolioFulltime(@RequestBody FolioFulltimeEntity folioFulltimeEntity,
                                                   @PathVariable Long id_unidad) {
        return folioFulltimeService.createFolioFulltime(folioFulltimeEntity, id_unidad);
    }

    @GetMapping("/folios_fulltime_by_unidad/{id_unidad}")
    public List<FolioFulltimeEntity> gettAllFoliosFulltimeByUnidad(@PathVariable Long id_unidad) {
        return folioFulltimeService.getAllByFoliosAndUnidadAcademica(id_unidad);
    }

    @GetMapping("/folios_fulltime")
    public List<FolioFulltimeEntity> getAllFoliosFulltime() {
        return folioFulltimeService.getAllFoliosFulltime();
    }
}
