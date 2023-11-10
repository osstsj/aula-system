package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;

import java.util.HashMap;
import java.util.List;


public interface IDocenteService {

    DocenteEntity createDocente(DocenteEntity docenteRequestDto, Long plantel_id);

    List<DocenteEntity> getAllDocentes();

    List<DocenteEntity> findAllDocentesByUnidad(Long unidad_id);

    DocenteEntity getDocenteById(Long id);

    DocenteEntity updateDocenteById(Long id, Long unidad_id, DocenteEntity docenteRequestDto);

    HashMap<String, String> deleteDocenteById(Long id);
}
