package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;

import java.util.List;

public interface IFolioFulltimeService {
    List<FolioFulltimeEntity> getAllFoliosFulltime();

    List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_unidad);

    Integer getSecuenciaNumeroFulltime(Long id_unidad, Integer periodo, String AoB);

    FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity folioFulltimeEntity, Long id_unidad);

}
