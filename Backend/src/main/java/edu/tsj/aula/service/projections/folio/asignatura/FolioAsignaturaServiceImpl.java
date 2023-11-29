package edu.tsj.aula.service.projections.folio.asignatura;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioAsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.rotate;

@Slf4j
@AllArgsConstructor
@Service
public class FolioAsignaturaServiceImpl implements IFolioAsignaturaService {
    private final FolioAsignaturaRepository folioAsignaturaRepository;
    private final UnidadRepository unidadRepository;
    private static UnidadEntity unidadAcademica = null; // Singleton Pattern: se intanta ahorrar memoria con una instancia global


    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignatura() {
        log.info("Se ha ejecutado el metodo getAllFoliosAsignatura");
        try {
            List<FolioAsignaturaEntity> folioToBeRotated = folioAsignaturaRepository.findAll();
            Collections.reverse(folioToBeRotated);
            return folioToBeRotated;
        } catch (Exception e) {
            log.error("Error al intentar traer la lista de de folios asignatura");
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<FolioAsignaturaEntity> getAllFoliosAsignaturaByUnidadAcademica(Long id_unidad) {
        log.info("Se ha ejecutado el metodo getAllFoliosAsignaturaByUnidadAcademica");

        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND));
        try {
            List<FolioAsignaturaEntity> folioToBeRotated =folioAsignaturaRepository.findAllByUnidad_academica(unidadAcademica);
            Collections.reverse(folioToBeRotated);
            return folioToBeRotated;
        } catch (Exception e) {
            log.error("Error al intentar traer la lista de folios asignatura por id unidad:{}", id_unidad.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }

    }

    @Transactional
    @Override
    public FolioAsignaturaEntity createFolioAsignatura(FolioAsignaturaEntity proyeccion, Long id_unidad) {
        try {
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
        } catch (Exception e) {
            log.error("Error al intentar craer folio asignatura por id unidad:{}, y DTO:{}", id_unidad.toString(), proyeccion.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Integer getSecuenciaNumeroAsignatura(Long id_unidad, Integer periodo, String AoB) {
        try {
            return folioAsignaturaRepository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                    (id_unidad, periodo, AoB) == 0 ? 1 : folioAsignaturaRepository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                    (id_unidad, periodo, AoB) + 1;

        } catch (Exception e) {
            log.error("Error al intentar seguir la secuencia de folio asignatura: id unidad: {}, periodo: {}, par o impar: {}", id_unidad, periodo, AoB);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public FolioAsignaturaEntity getFolioById(Long id) {
        try {
            return folioAsignaturaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontro folio asignatura con el id: "
                    .concat(id.toString()), HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            log.error("Error al intentar trear el folio asignatura por id: {}", id.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Boolean checkFolioAsignaturaDependers(Long id_folio_asignatura) {
        log.info("Se ha ejecutado el metodo checkFolioAsignaturaDependers");

        try {
            // true - hay folios asignatura presentes en otras tablas
            return folioAsignaturaRepository.checkFolioAsignaturaDependers(id_folio_asignatura) > 0;
        } catch (Exception e) {
            log.error("Error al intentar verificar si hay dependencias de folio asignatura con el  id: {}", id_folio_asignatura);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public HashMap<String, String> deleteFolioAsignaturaById(Long id) {
        log.info("Se ha ejecutado el metodo deleteFolioAsignaturaById");
        try {
            Optional<FolioAsignaturaEntity> checkFolioAsignatura = folioAsignaturaRepository.findById(id);
            if (checkFolioAsignatura.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                folioAsignaturaRepository.deleteById(id);
                response.put("message", String.format("El folio con el id: %s ha sido elimnado exitosamente!", id.toString()));

                log.debug("Se ha eliminado el folio con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            log.error("Error al elimnar el folio fulltime con el  id: {}", id);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }
}
