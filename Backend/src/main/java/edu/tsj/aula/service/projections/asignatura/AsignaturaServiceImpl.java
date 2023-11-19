package edu.tsj.aula.service.projections.asignatura;


import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.persistance.repository.control.CarreraRepository;
import edu.tsj.aula.persistance.repository.control.DocenteRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.AsignaturaRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioAsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class AsignaturaServiceImpl implements IAsignaturaService {
    private final AsignaturaRepository asignaturaRepository;
    private final FolioAsignaturaRepository folioAsignaturaRepository;
    private final DocenteRepository docenteRepository;
    private final CarreraRepository carreraRepository;
    private final UnidadRepository unidadRepository;

    private static FolioAsignaturaEntity folioAsignaturaEntity = null; //Singleton Pattern
    private static DocenteEntity docenteEntity = null;
    private static CarreraEntity carreraEntity = null;
    private static UnidadEntity unidadAcademica = null;

    @Transactional
    @Override
    public AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaRequest,
                                             Long id_folio, Long id_unidad,
                                             Long id_docente, Long id_carrera) {
        log.debug("Se ha ejecutado el metodo createAsignatura");
        folioAsignaturaEntity = folioAsignaturaRepository.findById(id_folio).orElseThrow(
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

        asignaturaRequest.setFolio(folioAsignaturaEntity);
        asignaturaRequest.setUnidad_academica(unidadAcademica);
        asignaturaRequest.getProfe_asignatura().setNombre_docente(docenteEntity);
        asignaturaRequest.getProfe_asignatura().setClave_programa(carreraEntity);

        Integer subtotal_1 = asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getB() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_frente_grupo() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAcademias().getPresidente() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAcademias().getSecretario() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getAsesorias_academica() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getEducacion_dual() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getResidencias_profesionales() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTitulacion() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTutorias() +
                asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getActividades_complementarias();

        Integer subtotal_2 = asignaturaRequest.getHoras_necesidad_institucional().getInvesigacion_educativa() +
                asignaturaRequest.getHoras_necesidad_institucional().getApoyo_operativo();

        asignaturaRequest.getHoras_sustantivas_atencion_alumnos().setSubtotal_1(subtotal_1);
        asignaturaRequest.getHoras_necesidad_institucional().setSubtotal_2(subtotal_2);

        Integer total = asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getSubtotal_1() +
                asignaturaRequest.getHoras_necesidad_institucional().getSubtotal_2();

        asignaturaRequest.setTotal(total);
        return asignaturaRepository.save(asignaturaRequest);
    }

    @Override
    public List<AsignaturaEntity> findAllByFolioById(Long id_folio) {
        log.debug("Se ha ejecutado el metodo findAllByFolioById");
        folioAsignaturaEntity = folioAsignaturaRepository.findById(id_folio)
                .orElseThrow(()-> new ResourceNotFoundException((" No se encontro folio..."),
                HttpStatus.NOT_FOUND));
        return asignaturaRepository.findAllByFolio(folioAsignaturaEntity);
    }

    @Override
    public AsignaturaEntity getAsignaturaById(Long id) {
        log.debug("Se ha ejecutado el metodo getAsignaturaById");
        return asignaturaRepository.findById(id).get();
    }

    @Override
    public List<AsignaturaEntity> getAllAsignaturas() {
        log.debug("Se ha ejecutado el metodo getAsignaturaById");
        return asignaturaRepository.findAll();
    }


}
