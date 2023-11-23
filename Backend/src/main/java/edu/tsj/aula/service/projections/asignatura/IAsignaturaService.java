package edu.tsj.aula.service.projections.asignatura;

import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;

import java.util.HashMap;
import java.util.List;

public interface IAsignaturaService {
    AsignaturaEntity getAsignaturaById(Long id);



    AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaEntity,
                                      Long id_folio, Long id_unidad,
                                      Long id_docente, Long id_carrera);

    AsignaturaEntity updateAsignatura(AsignaturaEntity asignaturaEntity,Long id_asignatura,
                                      Long id_folio, Long id_unidad,
                                      Long id_docente, Long id_carrera);

    HashMap<String, String> deleteAsignaturaById(Long id);

    List<AsignaturaEntity> findAllByFolioById(Long id_folio);
}
