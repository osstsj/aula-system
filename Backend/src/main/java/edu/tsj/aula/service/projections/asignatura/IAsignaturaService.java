package edu.tsj.aula.service.projections.asignatura;


import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.IComparacionAsignaturaDto;

import java.util.HashMap;
import java.util.List;

public interface IAsignaturaService {
    AsignaturaEntity getAsignaturaById(Long id);


    AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaRequestDto,
                                           Long id_folio, Long id_unidad,
                                           Long id_docente, Long id_carrera_por_unidad);

    AsignaturaEntity updateAsignatura(AsignaturaEntity asignaturaUpdateRequestDto, Long id_asignatura,
                                           Long id_folio, Long id_unidad,
                                           Long id_docente, Long id_carrera_por_unidad);

    HashMap<String, String> deleteAsignaturaById(Long id);

    List<AsignaturaEntity> findAllByFolioById(Long id_folio);

    List<IComparacionAsignaturaDto> showComparativeAsignaturaByIdsFolios(Long id_folio_1, Long id_folio_2);

}
