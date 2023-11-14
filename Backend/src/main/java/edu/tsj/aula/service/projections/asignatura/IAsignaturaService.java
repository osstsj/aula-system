package edu.tsj.aula.service.projections.asignatura;

import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaRequestDto;
import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaResponseDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;

import java.util.List;
import java.util.Optional;

public interface IAsignaturaService {
    AsignaturaEntity getAsignaturaById(Long id);

    List<AsignaturaEntity> getAllAsignaturas();

    AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaEntity,
                                      Long id_folio, Long id_unidad,
                                      Long id_docente, Long id_carrera);

    List<AsignaturaEntity> findAllByFolioById(Long id_folio);
}
