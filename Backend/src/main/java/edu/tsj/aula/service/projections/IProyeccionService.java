package edu.tsj.aula.service.projections;

import edu.tsj.aula.persistance.models.projections.entity.ProyeccionEntity;

import java.util.List;

public interface IProyeccionService {

    ProyeccionEntity getProyeccionById(Long id);

    List<ProyeccionEntity> getAllProyecciones();


    ProyeccionEntity createProyeccion(ProyeccionEntity proyeccion);

}
