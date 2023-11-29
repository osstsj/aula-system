package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioFulltimeRespository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class FolioFulltimeServiceImpl implements IFolioFulltimeService {
    private final FolioFulltimeRespository folioFulltimeRespository;
    private final UnidadRepository unidadRepository;
    // Singleton Pattern
    private static UnidadEntity unidadAcademica = null; // Singleton Pattern: se intanta ahorrar memoria con una instancia global


    @Override
    public List<FolioFulltimeEntity> getAllFoliosFulltime() {
        try {
            List<FolioFulltimeEntity> folioToBeRotated = folioFulltimeRespository.findAll();
            Collections.reverse(folioToBeRotated);
            return folioToBeRotated;
        } catch (Exception e) {
            log.error("Error al intentar seguir trear la lista de folios asignatura");
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_unidad) {
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND));
        try {
            List<FolioFulltimeEntity> folioToBeRotated = folioFulltimeRespository.findAllByUnidad_academica(unidadAcademica);
            Collections.reverse(folioToBeRotated);
            return folioToBeRotated;
        }  catch (Exception e) {
            log.error("Error al intentar seguir trear la lista de folios asignatura con el id unidad: {}", id_unidad);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Integer getSecuenciaNumeroFulltime(Long id_unidad, Integer periodo, String AoB) {
        log.info("Se ha ejecutado el metodo getSecuenciaNumeroFulltime");
        try {
            return folioFulltimeRespository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                    (id_unidad, periodo, AoB) == 0 ? 1 : folioFulltimeRespository.getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB
                    (id_unidad, periodo, AoB) + 1;
        } catch (Exception e) {
            log.error("Error al intentar continuar con la secuencia de folios para folio tiempo completo: id unidad: {}, periodo: {}, par o impar: {}", id_unidad, periodo, AoB);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public FolioFulltimeEntity getFolioById(Long id) {
        log.info("Se ha ejecutado el metodo getFolioById");
      return folioFulltimeRespository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro folio tiempo completo con el id: ".concat(id.toString()),
                    HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity folioFulltimeEntity, Long id_unidad) {
        log.info("Se ha ejecutado el metodo createFolioFulltime");
        try {
            unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                            HttpStatus.NOT_FOUND));

            folioFulltimeEntity.setUnidad_academica(unidadAcademica);
            folioFulltimeEntity.setFolio(folioFulltimeEntity.getUnidad_academica().getAbreviatura()
                    .concat(" - ")
                    .concat(folioFulltimeEntity.getNumero().toString())
                    .concat(" - ")
                    .concat(folioFulltimeEntity.getPeriodo().toString())
                    .concat(" ")
                    .concat(folioFulltimeEntity.getPeriodoAoB())
            );

            return folioFulltimeRespository.save(folioFulltimeEntity);
        } catch (Exception e) {
            log.error("Error al intentar crear el folio tiempo completo id unidad: {}, y DTO: {}", id_unidad, folioFulltimeEntity.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Boolean checkFolioFulltimeDependers(Long id_folio_fulltime) {
        log.info("Se ha ejecutado el metodo checkFolioFulltimeDependers");
        try {
            // true - hay folios fulltime presentes en otras tablas
            return folioFulltimeRespository.checkFolioFulltimeDependers(id_folio_fulltime) > 0;
        } catch (Exception e) {
            log.error("Error al intentar verificar si hay dependencias de folio fulltime con el  id: {}", id_folio_fulltime);
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public HashMap<String, String> deleteFolioFulltimeById(Long id) {
        log.info("Se ha ejecutado el metodo deleteFolioFulltimeById");
        try {
            Optional<FolioFulltimeEntity> checkFolioFulltime = folioFulltimeRespository.findById(id);
            if (checkFolioFulltime.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                folioFulltimeRespository.deleteById(id);
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
