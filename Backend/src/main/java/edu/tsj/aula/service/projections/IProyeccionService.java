package edu.tsj.aula.service.projections;

import edu.tsj.aula.persistance.models.projections.entity.FolioEntity;

import java.util.List;

public interface IProyeccionService {

    FolioEntity getProyeccionById(Long id);

    List<FolioEntity> getAllProyecciones();


    FolioEntity createProyeccion(FolioEntity proyeccion);

}
