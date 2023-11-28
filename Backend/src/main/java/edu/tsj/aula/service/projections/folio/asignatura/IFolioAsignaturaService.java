package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface IFolioAsignaturaService {
    List<FolioAsignaturaEntity> getAllFoliosAsignatura();

    List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidadAcademica(Long id_unidad);

    FolioAsignaturaEntity createFolioAsignatura(FolioAsignaturaEntity proyeccion, Long id_unidad);

    Integer getSecuenciaNumeroAsignatura(Long id_unidad, Integer periodo, String AoB);

    FolioAsignaturaEntity getFolioById(Long id);

    Boolean checkFolioAsignaturaDependers(Long id_folio_asignatura);

    HashMap<String, String> deleteFolioAsignaturaById(Long id);

}
