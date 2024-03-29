package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface IFolioFulltimeService {
    List<FolioFulltimeEntity> getAllFoliosFulltime();

    List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_unidad);

    Integer getSecuenciaNumeroFulltime(Long id_unidad, Integer periodo, String AoB);

    FolioFulltimeEntity getFolioById(Long id);

    FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity folioFulltimeEntity, Long id_unidad);

    Boolean checkFolioFulltimeDependers(Long id_folio_fulltime);

    HashMap<String, String> deleteFolioFulltimeById(Long id);
}
