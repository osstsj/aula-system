package edu.tsj.aula.service.projections.fulltime;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
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
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class FulltimeServiceImpl implements IFulltimeService {
    private final FulltimeRepository fulltimeRepository;
    private final FolioFulltimeRespository folioFulltimeRespository;
    private final DocenteRepository docenteRepository;
    private final CarreraRepository carreraRepository;
    private final UnidadRepository unidadRepository;

    private static FolioFulltimeEntity folioFulltimeEntity = null;
    private static DocenteEntity docenteEntity = null;
    private static CarreraEntity carreraEntity = null;
    private static UnidadEntity unidadAcademica = null;

    @Transactional
    @Override
    public FullTimeEntity createFulltime(FullTimeEntity fullTimeDto,
                                         Long id_folio, Long id_unidad,
                                         Long id_docente, Long id_carrera) {

        log.debug("Se ha ejecutado el metodo createFulltime");
        folioFulltimeEntity = folioFulltimeRespository.findById(id_folio).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro folio... con el id: ".concat(id_folio.toString())),
                        HttpStatus.NOT_FOUND));
        docenteEntity = docenteRepository.findById(id_docente).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro docente... con el id: ".concat(id_docente.toString())),
                        HttpStatus.NOT_FOUND));
        carreraEntity = carreraRepository.findById(id_carrera).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro carrera... con el id: ".concat(id_carrera.toString())),
                        HttpStatus.NOT_FOUND));
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro unidad academica... con el id: ".concat(id_unidad.toString())),
                        HttpStatus.NOT_FOUND));

        fullTimeDto.setFolio(folioFulltimeEntity);
        fullTimeDto.setUnidad_academica(unidadAcademica);
        fullTimeDto.getProfesor_fulltime().setNombre_docente(docenteEntity);
        fullTimeDto.getProfesor_fulltime().setClave_programa(carreraEntity);

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
    }

    @Override
    public List<FullTimeEntity> findAllByFolioById(Long id_folio) {
        log.debug("Se ha ejecutado el metodo findAllByFolioById");

        folioFulltimeEntity = folioFulltimeRespository.findById(id_folio)
                .orElseThrow(()-> new ResourceNotFoundException((" No se encontro folio... con el id: ".concat(id_folio.toString())),
                        HttpStatus.NOT_FOUND));
        return fulltimeRepository.findAllByFolio(folioFulltimeEntity);
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
        return fulltimeRepository.findAll();
    }


}
