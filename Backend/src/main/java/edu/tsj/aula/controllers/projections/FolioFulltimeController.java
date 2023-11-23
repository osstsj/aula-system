package edu.tsj.aula.controllers.projections;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.service.projections.folio.fulltime.IFolioFulltimeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/folios_fulltime_get_secuencia/{id_unidad}/{periodo}/{AoB}")
    public Integer getSecuenciaNumero(@PathVariable Long id_unidad,
                                      @PathVariable Integer periodo,
                                      @PathVariable String AoB) {
        return folioFulltimeService.getSecuenciaNumeroFulltime(id_unidad, periodo, AoB);
    }

    @GetMapping(value = "/folio_fulltime/{id_folio}")
    public Optional<FolioFulltimeEntity> getFolioById(@PathVariable Long id_folio) {
        return folioFulltimeService.getFolioById(id_folio);
    }

    @GetMapping("/folios_fulltime")
    public List<FolioFulltimeEntity> getAllFoliosFulltime() {
        return folioFulltimeService.getAllFoliosFulltime();
    }
}
