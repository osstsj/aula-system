package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;

import java.util.List;

public interface IFolioAsignaturaService {

    FolioAsignaturaEntity getFolioAsignaturaById(Long id);

    List<FolioAsignaturaEntity> getAllFoliosAsignatura();

    List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidadAcademica(Long id_unidad);

    FolioAsignaturaEntity createFolioAsignatura(FolioAsignaturaEntity proyeccion, Long id_unidad);

}
