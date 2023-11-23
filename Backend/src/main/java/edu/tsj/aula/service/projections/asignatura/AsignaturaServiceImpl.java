package edu.tsj.aula.service.projections.asignatura;


import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad.HorasNecesidadInstitucionalAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.AcademiaAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasAsignaturaAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasSustantivasAtencionAlumnosAsignatura;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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

        String tipoAoB = asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA() == 0 ?
                "B" : "A";

        asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().setTipoAoB(tipoAoB);

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

    @Transactional
    @Override
    public AsignaturaEntity updateAsignatura(AsignaturaEntity asignaturaRequest, Long id_asignatura,
                                             Long id_folio, Long id_unidad,
                                             Long id_docente, Long id_carrera) {
        log.debug("Se ha ejecutado el metodo createAsignatura");

        AsignaturaEntity exisitingAsignatura = asignaturaRepository.findById(id_asignatura).orElseThrow(
                () -> new  ResourceNotFoundException("No se encontro proyeccion de asignatura con el id:".concat(id_asignatura.toString()),
                        HttpStatus.NOT_FOUND)
        );
        carreraEntity = carreraRepository.findById(id_carrera).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro carrera... con el id: ".concat(id_carrera.toString())),
                        HttpStatus.NOT_FOUND));
        exisitingAsignatura.getProfe_asignatura().setClave_programa(carreraEntity);

        Integer auxCarga_horaria_anterior = exisitingAsignatura.getTotal();
        String auxCategoria_horas_asignatura_anterior = exisitingAsignatura.getHoras_sustantivas_atencion_alumnos()
                .getHoras_asignatura().getTipoAoB();
        String tipoAoB = asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA() == 0 ?
                "B" : "A";

//        HorasSustantivasAtencionAlumnosAsignatura
//       ----------- HorasAsignaturaAsignatura
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura()
                .setA(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura()
                .setB(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getB());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().setTipoAoB(tipoAoB);

//        ----------- AcademiaAsignatura
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().
                setHoras_frente_grupo(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getHoras_frente_grupo());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAcademias()
                .setPresidente(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAcademias().getPresidente());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAcademias()
                .setSecretario(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAcademias().getSecretario());

//        ----------- AsesoriaAsignatura
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                .setAsesorias_academica(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getAsesorias_academica());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                .setEducacion_dual(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getEducacion_dual());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                .setResidencias_profesionales(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getResidencias_profesionales());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                .setTitulacion(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTitulacion());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                .setTutorias(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTutorias());
        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos()
                .setActividades_complementarias(asignaturaRequest.getHoras_sustantivas_atencion_alumnos().getActividades_complementarias());

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

        exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().setSubtotal_1(subtotal_1);

//        HorasNecesidadInstitucionalAsignatura
        exisitingAsignatura.getHoras_necesidad_institucional()
                .setInvesigacion_educativa(asignaturaRequest.getHoras_necesidad_institucional().getInvesigacion_educativa());
        exisitingAsignatura.getHoras_necesidad_institucional()
                .setApoyo_operativo(asignaturaRequest.getHoras_necesidad_institucional().getApoyo_operativo());

        Integer subtotal_2 = asignaturaRequest.getHoras_necesidad_institucional().getInvesigacion_educativa() +
                asignaturaRequest.getHoras_necesidad_institucional().getApoyo_operativo();

        exisitingAsignatura.getHoras_necesidad_institucional().setSubtotal_2(subtotal_2);


        Integer total = exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getSubtotal_1() +
                exisitingAsignatura.getHoras_necesidad_institucional().getSubtotal_2();

        exisitingAsignatura.setTotal(total);

        //--- modificaciones (tabla azul)
        exisitingAsignatura.setFecha_actualizacion(LocalDateTime.now());
        exisitingAsignatura.setCarga_horaria_anterior(auxCarga_horaria_anterior);
        exisitingAsignatura.setCategoria_horas_asignatura_anterior(auxCategoria_horas_asignatura_anterior);
        exisitingAsignatura.setCarga_horaria_nueva(total);
        exisitingAsignatura.setCategoria_tipo_horas_asignatura_nueva(tipoAoB);
        exisitingAsignatura.setObservaciones_modificacion(asignaturaRequest.getObservaciones());


        return asignaturaRepository.save(exisitingAsignatura);
    }

    @Override
    public HashMap<String, String> deleteAsignaturaById(Long id) {
        log.info("Se ha ejecutado el metodo deleteAsignaturaById");
        try {
            Optional<AsignaturaEntity> checkAsignatura = asignaturaRepository.findById(id);
            if (checkAsignatura.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                asignaturaRepository.deleteById(id);
                response.put("message", String.format("La asignatura con el id: %s a sido eliminado exitosamente!",
                        id.toString()));

                log.debug("Se ha eliminado al docente con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            log.error("Error al intentar eliminar la asignatura con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
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

}
