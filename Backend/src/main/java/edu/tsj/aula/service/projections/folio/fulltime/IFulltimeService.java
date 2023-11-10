package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;

import java.util.List;

public interface IFulltimeService {

    FullTimeEntity getFulltimeById(Long id);

    List<FullTimeEntity> getAllFulltime();

    FullTimeEntity createFulltime(FullTimeEntity fullTimeEntity,
                                  Long id_folio, Long id_unidad,
                                  Long id_docente, Long id_carrera);

    List<FullTimeEntity> findAllByFolioAndUnidad(Long id_folio, Long id_unidad);

    List<FullTimeEntity> findAllById(Long id);
}
