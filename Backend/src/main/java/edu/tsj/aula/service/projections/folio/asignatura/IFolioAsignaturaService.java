package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;

import java.util.List;

public interface IFolioAsignaturaService {

    FolioAsignaturaEntity getProyeccionById(Long id);

    List<FolioAsignaturaEntity> getAllProyecciones();

    List<FolioAsignaturaEntity> findAllByUnidadAcademica(Long id_unidad);

    FolioAsignaturaEntity createProyeccion(FolioAsignaturaEntity proyeccion, Long id_unidad);

}
