package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;

import java.util.List;

public interface IFulltimeService {

    FolioFulltimeEntity getFolioFulltimeById(Long id);

    List<FolioFulltimeEntity> getAllFoliosFulltime();

    FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity folioFulltimeEntity,
                                       Long id_folio, Long id_unidad,
                                       Long id_docente, Long id_carrera);

    List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_folio, Long id_unidad);

}
