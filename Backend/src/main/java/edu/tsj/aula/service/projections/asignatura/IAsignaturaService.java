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

    AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaEntity, Long id_folio);

    List<AsignaturaEntity> findAllByUnidad_academica(List<String> plantel);

    List<AsignaturaEntity> findAllByFolioId(Long id_folio);
}