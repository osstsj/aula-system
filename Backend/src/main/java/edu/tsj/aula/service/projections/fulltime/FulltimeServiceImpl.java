package edu.tsj.aula.service.projections.fulltime;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.persistance.repository.control.CarreraPorUnidadRepository;
import edu.tsj.aula.persistance.repository.control.CarreraRepository;
import edu.tsj.aula.persistance.repository.control.DocenteRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.FulltimeRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioFulltimeRespository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class FulltimeServiceImpl implements IFulltimeService {
    private final FulltimeRepository fulltimeRepository;
    private final FolioFulltimeRespository folioFulltimeRespository;
    private final DocenteRepository docenteRepository;
    private final CarreraPorUnidadRepository carreraPorUnidadRepository;
    private final UnidadRepository unidadRepository;

    // Singleton
    private static FolioFulltimeEntity folioFulltimeEntity = null;
    private static DocenteEntity docenteEntity = null;
    private static CarreraPorUnidadEntity carreraPorUnidadEntity = null;
    private static UnidadEntity unidadAcademica = null;

    @Transactional
    @Override
    public FullTimeEntity createFulltime(FullTimeEntity fullTimeDto,
                                         Long id_folio, Long id_unidad,
                                         Long id_docente, Long id_carrera_por_unidad) {

        log.debug("Se ha ejecutado el metodo createFulltime");
        try {

            folioFulltimeEntity = folioFulltimeRespository.findById(id_folio).orElseThrow(
                    ()-> new ResourceNotFoundException((" No se encontro folio... con el id: ".concat(id_folio.toString())),
                            HttpStatus.NOT_FOUND));
            docenteEntity = docenteRepository.findById(id_docente).orElseThrow(
                    ()-> new ResourceNotFoundException((" No se encontro docente... con el id: ".concat(id_docente.toString())),
                            HttpStatus.NOT_FOUND));
            carreraPorUnidadEntity = carreraPorUnidadRepository.findById(id_carrera_por_unidad).orElseThrow(
                    ()-> new ResourceNotFoundException((" No se encontro carrera... con el id: ".concat(id_carrera_por_unidad.toString())),
                            HttpStatus.NOT_FOUND));
            unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                    ()-> new ResourceNotFoundException((" No se encontro unidad academica... con el id: ".concat(id_unidad.toString())),
                            HttpStatus.NOT_FOUND));

            fullTimeDto.setFolio(folioFulltimeEntity);
            fullTimeDto.setUnidad_academica(unidadAcademica);
            fullTimeDto.getProfesor_fulltime().setNombre_docente(docenteEntity);
            fullTimeDto.getProfesor_fulltime().setClave_programa(carreraPorUnidadEntity);

            Integer subtotal_1 =
                    fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getHoras_frente_grupo() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getPresidente() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getSecretario() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getAsesorias_academica() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getEducacion_dual() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getResidencias_profesionales() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getTitulacion() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getTutorias() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getActividades_complementarias();

            Integer subtotal_2 = fullTimeDto.getHoras_necesidad_institucional_fulltime().getProyecto_investigacion() +
                    fullTimeDto.getHoras_necesidad_institucional_fulltime().getApoyo_operativo();

            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().setSubtotal_1(subtotal_1);
            fullTimeDto.getHoras_necesidad_institucional_fulltime().setSubtotal_2(subtotal_2);

            Integer total = fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getSubtotal_1() +
                    fullTimeDto.getHoras_necesidad_institucional_fulltime().getSubtotal_2();

            fullTimeDto.setTotal(total);

            return fulltimeRepository.save(fullTimeDto);
        } catch (Exception e) {
            log.error("Error al intentar crear la proyeccion tiempo completo: {}", fullTimeDto);
            throw  new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public FullTimeEntity updateFulltimeById(FullTimeEntity fullTimeDto,
                                             Long id_fulltime, Long id_folio,
                                             Long id_unidad, Long id_docente,
                                             Long id_carrera_por_unidad) {
        log.debug("Se ha ejecutado el metodo updateFulltime");
        try {
            FullTimeEntity existingFulltime = fulltimeRepository.findById(id_fulltime).orElseThrow(
                    () -> new  ResourceNotFoundException("No se encontro proyeccion de tiempo completo con el id:".concat(id_fulltime.toString()),
                            HttpStatus.NOT_FOUND)
            );

            // no se actualizan las entidades: Unidad Academica, Docente.
            carreraPorUnidadEntity = carreraPorUnidadRepository.findById(id_carrera_por_unidad).orElseThrow(
                    ()-> new ResourceNotFoundException((" No se encontro carrera... con el id: ".concat(id_carrera_por_unidad.toString())),
                            HttpStatus.NOT_FOUND));
            existingFulltime.getProfesor_fulltime().setClave_programa(carreraPorUnidadEntity);

            String auxNivel_ptc_anterior = existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getPtc();
            Integer auxCarga_horaria_anterior = existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getHoras_frente_grupo();

            //        HorasSustantivasAtencionAlumnosAsignatura
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().setPtc(fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getPtc());

            //----------- HorasAsignaturaAsignatura
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().setHoras_frente_grupo(fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime()
                    .getHoras_frente_grupo());

            //        ----------- Academia
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().setPresidente(fullTimeDto
                    .getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getPresidente());
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().setSecretario(fullTimeDto
                    .getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getSecretario());

            //        ----------- Asesoria
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().setAsesorias_academica(fullTimeDto
                    .getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getAsesorias_academica());
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().setEducacion_dual(fullTimeDto
                    .getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getEducacion_dual());
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().setResidencias_profesionales
                    (fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getResidencias_profesionales());
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().setTitulacion
                    (fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getTitulacion());
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().setActividades_complementarias
                    (existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getActividades_complementarias());

            Integer subtotal_1 =
                    fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getHoras_frente_grupo() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getPresidente() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAcademias().getSecretario() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getAsesorias_academica() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getEducacion_dual() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getResidencias_profesionales() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getTitulacion() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getAsesorias().getTutorias() +
                            fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getActividades_complementarias();
            existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().setSubtotal_1(subtotal_1);

            //        HorasNecesidadInstitucionalAsignatura
            existingFulltime.getHoras_necesidad_institucional_fulltime().setProyecto_investigacion
                    (fullTimeDto.getHoras_necesidad_institucional_fulltime().getProyecto_investigacion());
            existingFulltime.getHoras_necesidad_institucional_fulltime().setApoyo_operativo
                    (fullTimeDto.getHoras_necesidad_institucional_fulltime().getApoyo_operativo());

            Integer subtotal_2 = fullTimeDto.getHoras_necesidad_institucional_fulltime().getProyecto_investigacion() +
                    fullTimeDto.getHoras_necesidad_institucional_fulltime().getApoyo_operativo();

            existingFulltime.getHoras_necesidad_institucional_fulltime().setSubtotal_2(subtotal_2);

            Integer total = existingFulltime.getHoras_sustantivas_atencion_alumnos_fulltime().getSubtotal_1() +
                    existingFulltime.getHoras_necesidad_institucional_fulltime().getSubtotal_2();

            existingFulltime.setTotal(total);

            //--- modificaciones (tabla azul)
            existingFulltime.setFecha_actualizacion(LocalDateTime.now());
            existingFulltime.setCarga_horaria_anterior(auxCarga_horaria_anterior);
            existingFulltime.setNivel_ptc_anterior(auxNivel_ptc_anterior);
            existingFulltime.setCarga_horaria_nueva(fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getHoras_frente_grupo());
            existingFulltime.setNivel_ptc_nuevo(fullTimeDto.getHoras_sustantivas_atencion_alumnos_fulltime().getPtc());
            existingFulltime.setObservacion_modificacion(fullTimeDto.getObservaciones());

            return fulltimeRepository.save(existingFulltime);
        } catch (Exception e) {
            log.error("Error al intentar actualizar la proyeccion tiempo completo: {}", fullTimeDto);
            throw  new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }

    }

    @Override
    public List<FullTimeEntity> findAllByFolioById(Long id_folio) {
        log.debug("Se ha ejecutado el metodo findAllByFolioById");

        folioFulltimeEntity = folioFulltimeRespository.findById(id_folio)
                .orElseThrow(()-> new ResourceNotFoundException((" No se encontro folio... con el id: ".concat(id_folio.toString())),
                        HttpStatus.NOT_FOUND));
        try {
            return fulltimeRepository.findAllByFolio(folioFulltimeEntity);
        } catch (Exception e) {
            log.error("Error al intenter buscar las proyecciones tiempo completo con el id folio: {}", id_folio);
            throw  new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public HashMap<String, String> deleteFulltimeById(Long id) {
        log.debug("Se ha ejecutado el metodo deleteFulltime");
        try {
            Optional<FullTimeEntity> checkFulltime = fulltimeRepository.findById(id);
            if (checkFulltime.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                fulltimeRepository.deleteById(id);

                response.put("message", String.format("La proyeccion de tiempo completo con el id: %s a sido eliminado exitosamente!",
                        id.toString()));
            }
            return null;
        } catch (Exception e) {
                log.error("Error al intentar eliminar la proyeccion de tiempo completo con el id: ".concat(id.toString()));
                throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public FullTimeEntity getFulltimeById(Long id) {
        log.debug("Se ha ejecutado el metodo findAllByFolioById");
        return fulltimeRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro proyeccion tiempo completo... con el id: ".concat(id.toString())),
                HttpStatus.NOT_FOUND));
    }

    @Override
    public List<FullTimeEntity> getAllFulltime() {
        log.debug("Se ha ejecutado el metodo getAsignaturaById");

        try {
            return fulltimeRepository.findAll();
        } catch (Exception e) {
            log.error("Error al intentar traer la lista de proyecciones tiempo completo");
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }

    }

}
