package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioAsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class FolioAsignaturaServiceImpl implements IFolioAsignaturaService {
    private final FolioAsignaturaRepository folioAsignaturaRepository;
    private final UnidadRepository unidadRepository;

    @Transactional
    @Override
    public FolioAsignaturaEntity getFolioAsignaturaById(Long id) {
        return folioAsignaturaRepository.findById(id).get();
        // debe cambiarse a optional por seguridad
    }

    @Transactional
    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignatura() {
        return folioAsignaturaRepository.findAll();
    }

    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidadAcademica(Long id_unidad) {
        UnidadEntity unidadAcademica = unidadRepository.findById(id_unidad).get();

        return folioAsignaturaRepository.findAllByUnidad_academicaAndAndTipo_folio(unidadAcademica);
    }

    @Transactional
    @Override
    public FolioAsignaturaEntity createFolioAsignatura(FolioAsignaturaEntity proyeccion, Long id_unidad) {
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

        return folioAsignaturaRepository.save(proyeccion);
    }
}
