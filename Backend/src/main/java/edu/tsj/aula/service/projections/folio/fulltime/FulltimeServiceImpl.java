package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;

import java.util.List;

public class FulltimeServiceImpl implements IFulltimeService{
    @Override
    public FullTimeEntity getFulltimeById(Long id) {
        return null;
    }

    @Override
    public List<FullTimeEntity> getAllFulltime() {
        return null;
    }

    @Override
    public FullTimeEntity createFulltime(FullTimeEntity fullTimeEntity, Long id_folio, Long id_unidad, Long id_docente, Long id_carrera) {
        return null;
    }

    @Override
    public List<FullTimeEntity> findAllByFolioAndUnidad(Long id_folio, Long id_unidad) {
        return null;
    }

    @Override
    public List<FullTimeEntity> findAllById(Long id) {
        return null;
    }
}
