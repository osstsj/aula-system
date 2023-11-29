package edu.tsj.aula.service.projections.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.IComparacionFulltimeDto;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

public interface IFulltimeService {
    FullTimeEntity getFulltimeById(Long id);

    List<FullTimeEntity> getAllFulltime();

    FullTimeEntity createFulltime(FullTimeEntity fullTimeDto,
                                  Long id_folio, Long id_unidad,
                                  Long id_docente, Long id_carrera_por_unidad);

    FullTimeEntity updateFulltimeById(FullTimeEntity fullTimeDto, Long id_fulltime,
                                  Long id_folio, Long id_unidad,
                                  Long id_docente, Long id_carrera_por_unidad);

    List<FullTimeEntity> findAllByFolioById(Long id_folio);

    HashMap<String, String> deleteFulltimeById(Long id);

    List<IComparacionFulltimeDto> showComparativeFulltomeByIdsFolios(Long id_folio_1, Long id_folio_2);
}
