package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioAsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class FolioAsignaturaServiceImpl implements IFolioAsignaturaService {
    private final FolioAsignaturaRepository folioAsignaturaRepository;
    private final UnidadRepository unidadRepository;
    private static UnidadEntity unidadAcademica = null; // Singleton Pattern: se intanta ahorrar memoria con una instancia global


    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignatura() {
        return folioAsignaturaRepository.findAll();
    }

    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidadAcademica(Long id_unidad) {
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND)
        );

        return folioAsignaturaRepository.findAllByUnidad_academica(unidadAcademica);
    }

    @Transactional
    @Override
    public FolioAsignaturaEntity createFolioAsignatura(FolioAsignaturaEntity proyeccion, Long id_unidad) {
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND)
        );

        proyeccion.setUnidad_academica(unidadAcademica);
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

    @Override
    public Integer getSecuenciaNumeroAsignatura(Long id_unidad, Integer periodo, String AoB) {
        return folioAsignaturaRepository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                (id_unidad, periodo, AoB) == 0 ? 1 : folioAsignaturaRepository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                (id_unidad, periodo, AoB) + 1;
    }

    @Override
    public Optional<FolioAsignaturaEntity> getFolioById(Long id) {
        return folioAsignaturaRepository.findById(id);
    }
}
