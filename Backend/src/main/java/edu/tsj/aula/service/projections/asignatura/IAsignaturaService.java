package edu.tsj.aula.service.projections.asignatura;

import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaRequestDto;
import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaResponseDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;

import java.util.List;
import java.util.Optional;

public interface IAsignaturaService {
//    AsignaturaResponseDto createAsignatura(AsignaturaRequestDto asignaturaRequestDto);
//
    AsignaturaEntity getAsignaturaById(Long id);

    List<AsignaturaEntity> getAsignaturas();

    AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaEntity,
                                      Long id_folio, Long id_unidad,
                                      Long id_docente, Long id_carrera);

//    List<AsignaturaEntity> findAllByFolioAndUnidad(Long id_folio, Long id_unidad_academica);

    List<AsignaturaEntity> findAllByFolioId(Long id_folio);
}
