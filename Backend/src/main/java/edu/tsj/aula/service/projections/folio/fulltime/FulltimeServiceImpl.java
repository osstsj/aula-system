package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioFulltimeRespository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class FulltimeServiceImpl implements IFulltimeService{
    private final FolioFulltimeRespository folioFulltimeRespository;
    private final UnidadRepository unidadRepository;

    @Transactional
    @Override
    public FolioFulltimeEntity getFolioFulltimeById(Long id) {
        return folioFulltimeRespository.findById(id).get();
    }

    @Transactional
    @Override
    public List<FolioFulltimeEntity> getAllFoliosFulltime() {
        return folioFulltimeRespository.findAll();
    }

    @Transactional
    @Override
    public FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity proyeccion, Long id_folio, Long id_unidad, Long id_docente, Long id_carrera) {
        UnidadEntity unidadEntity = unidadRepository.findById(id_unidad).get();
        proyeccion.setUnidad_academica(unidadEntity);
        proyeccion.setFolio(proyeccion.getUnidad_academica().getAbreviatura()
                .concat(" - ")
                .concat(proyeccion.getNumero().toString())
                .concat(" - ")
                .concat(proyeccion.getPeriodo().toString())
                .concat(" ")
                .concat(proyeccion.getPeriodoAoB())
        );

        return folioFulltimeRespository.save(proyeccion);
    }

    @Transactional
    @Override
    public List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_folio, Long id_unidad) {
        return null;
    }


}
