package edu.tsj.aula.service.projections.asignatura;


import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.IComparacionAsignaturaDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.extensionform.ExtensionFormAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.persistance.repository.control.CarreraPorUnidadRepository;
import edu.tsj.aula.persistance.repository.control.DocenteRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.AsignaturaRepository;
import edu.tsj.aula.persistance.repository.projections.ExtensionsFormAsignaturaRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioAsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class AsignaturaServiceImpl implements IAsignaturaService {
    private final AsignaturaRepository asignaturaRepository;
    private final FolioAsignaturaRepository folioAsignaturaRepository;
    private final DocenteRepository docenteRepository;
    private final CarreraPorUnidadRepository carreraPorUnidadRepository;
    private final UnidadRepository unidadRepository;
    private final ExtensionsFormAsignaturaRepository extensionsFormAsignaturaRepository;

    private static FolioAsignaturaEntity folioAsignaturaEntity = null; //Singleton Pattern
    private static DocenteEntity docenteEntity = null;
    private static CarreraPorUnidadEntity carreraPorUnidadEntity = null;
    private static UnidadEntity unidadAcademica = null;
    private static ExtensionFormAsignaturaEntity extensionFormAsignaturaEntity = null;

    @Transactional
    @Override
    public AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaRequestDto, Long id_folio, Long id_unidad, Long id_docente, Long id_carrera_por_unidad) {
        log.debug("Se ha ejecutado el metodo createAsignatura");
        folioAsignaturaEntity = folioAsignaturaRepository.findById(id_folio).orElseThrow(
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


        try {
            asignaturaRequestDto.setFolio(folioAsignaturaEntity);
            asignaturaRequestDto.setUnidad_academica(unidadAcademica);
            asignaturaRequestDto.getProfe_asignatura().setNombre_docente(docenteEntity);
            asignaturaRequestDto.getProfe_asignatura().setClave_programa(carreraPorUnidadEntity);

//            List<ExtensionFormAsignaturaEntity> extensionFormAsignaturaEntityList = getExtensionFormAsignaturaEntities(asignaturaRequestDto);


            String tipoAoB = asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA() == 0 ?
                    "B" : "A";

            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().setTipoAoB(tipoAoB);

            Integer subtotal_1 =
                    asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_frente_grupo() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getPresidente() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getSecretario() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getAsesorias_academica() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getEducacion_dual() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getResidencias_profesionales() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTitulacion() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTutorias() +
                            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getActividades_complementarias();

            Integer subtotal_2 = asignaturaRequestDto.getHoras_necesidad_institucional().getInvesigacion_educativa() +
                    asignaturaRequestDto.getHoras_necesidad_institucional().getApoyo_operativo();

            asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().setSubtotal_1(subtotal_1);
            asignaturaRequestDto.getHoras_necesidad_institucional().setSubtotal_2(subtotal_2);

            Integer total = asignaturaRequestDto.getHoras_sustantivas_atencion_alumnos().getSubtotal_1() +
                    asignaturaRequestDto.getHoras_necesidad_institucional().getSubtotal_2();

            asignaturaRequestDto.setTotal(total);

            //----- Detalles del docente-------
            docenteEntity.setUltima_horas(total);
            docenteEntity.setFolio_ultimo_registro_y_tipo_folio(folioAsignaturaEntity.getFolio().concat(" - ").concat("Proyección Asignatura"));

//            asignaturaRequestDto.setExtensiones(null); // resetea
            AsignaturaEntity asignaturaEntity = asignaturaRepository.save(asignaturaRequestDto);
//            extensionFormAsignaturaEntityList.forEach(extensiones -> {
//                asignaturaEntity.getExtensiones().add(extensiones);
//            });

            return asignaturaEntity;

        } catch (Exception e) {
            log.error("Error al intentar crear la proyeccion asignatura con el DTO: {}", asignaturaRequestDto.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

//    private static List<ExtensionFormAsignaturaEntity> getExtensionFormAsignaturaEntities(AsignaturaEntity asignaturaRequestDto) {
//        List<ExtensionFormAsignaturaEntity> extensionFormAsignaturaEntityList = new ArrayList<>();
//        if (!asignaturaRequestDto.getExtensiones().isEmpty()) {
//             extensionFormAsignaturaEntityList = new ArrayList<>(asignaturaRequestDto.getExtensiones());
//        }
//        return extensionFormAsignaturaEntityList;
//    }

    @Transactional
    @Override
    public AsignaturaEntity updateAsignatura(AsignaturaEntity asignaturaUpdateRequestDto, Long id_asignatura, Long id_folio, Long id_unidad, Long id_docente, Long id_carrera_por_unidad) {
        log.debug("Se ha ejecutado el metodo createAsignatura");
        carreraPorUnidadEntity = carreraPorUnidadRepository.findById(id_carrera_por_unidad).orElseThrow(
                ()-> new ResourceNotFoundException((" No se encontro carrera... con el id: ".concat(id_carrera_por_unidad.toString())),
                        HttpStatus.NOT_FOUND));
        AsignaturaEntity exisitingAsignatura = asignaturaRepository.findById(id_asignatura).orElseThrow(
                () -> new  ResourceNotFoundException("No se encontro proyeccion de asignatura con el id:".concat(id_asignatura.toString()),
                        HttpStatus.NOT_FOUND));

        try {
            exisitingAsignatura.getProfe_asignatura().setClave_programa(carreraPorUnidadEntity);

            Integer auxCarga_horaria_anterior = exisitingAsignatura.getTotal();
            String auxCategoria_horas_asignatura_anterior = exisitingAsignatura.getHoras_sustantivas_atencion_alumnos()
                    .getHoras_asignatura().getTipoAoB();
            String tipoAoB = asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA() == 0 ?
                    "B" : "A";

            //        HorasSustantivasAtencionAlumnosAsignatura
            //       ----------- HorasAsignaturaAsignatura
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura()
                    .setA(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getA());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura()
                    .setB(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().getB());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getHoras_asignatura().setTipoAoB(tipoAoB);

            //        ----------- AcademiaAsignatura
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().
                    setHoras_frente_grupo(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_frente_grupo());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAcademias()
                    .setPresidente(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getPresidente());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAcademias()
                    .setSecretario(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getSecretario());

            //        ----------- AsesoriaAsignatura
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                    .setAsesorias_academica(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getAsesorias_academica());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                    .setEducacion_dual(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getEducacion_dual());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                    .setResidencias_profesionales(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getResidencias_profesionales());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                    .setTitulacion(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTitulacion());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().getAsesorias()
                    .setTutorias(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTutorias());
            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos()
                    .setActividades_complementarias(asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getActividades_complementarias());

            Integer subtotal_1 =
                    asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getHoras_frente_grupo() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getPresidente() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAcademias().getSecretario() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getAsesorias_academica() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getEducacion_dual() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getResidencias_profesionales() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTitulacion() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getAsesorias().getTutorias() +
                            asignaturaUpdateRequestDto.getHoras_sustantivas_atencion_alumnos().getActividades_complementarias();

            exisitingAsignatura.getHoras_sustantivas_atencion_alumnos().setSubtotal_1(subtotal_1);

            //        HorasNecesidadInstitucionalAsignatura
            exisitingAsignatura.getHoras_necesidad_institucional()
                    .setInvesigacion_educativa(asignaturaUpdateRequestDto.getHoras_necesidad_institucional().getInvesigacion_educativa());
            exisitingAsignatura.getHoras_necesidad_institucional()
                    .setApoyo_operativo(asignaturaUpdateRequestDto.getHoras_necesidad_institucional().getApoyo_operativo());

            Integer subtotal_2 = asignaturaUpdateRequestDto.getHoras_necesidad_institucional().getInvesigacion_educativa() +
                    asignaturaUpdateRequestDto.getHoras_necesidad_institucional().getApoyo_operativo();

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
            exisitingAsignatura.setObservaciones_modificacion(asignaturaUpdateRequestDto.getObservaciones());

            //----- Detalles del docente-------
            docenteEntity.setUltima_horas(total);
            docenteEntity.setFolio_ultimo_registro_y_tipo_folio(folioAsignaturaEntity.getFolio().concat(" - ").concat("Proyección Asignatura"));

            return asignaturaRepository.save(exisitingAsignatura);

        } catch (Exception e) {
            log.error("Error al intentar actualizar la proyeccion asignatura con el DTO: {}, y el id:{} ", asignaturaUpdateRequestDto.toString(),
                    id_unidad.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteAsignaturaById(Long id) {
        log.info("Se ha ejecutado el metodo deleteAsignaturaById");
        try {
            Optional<AsignaturaEntity> checkAsignatura = asignaturaRepository.findById(id);
            if (checkAsignatura.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                asignaturaRepository.deleteById(id);
                response.put("message", String.format("La proyeccion de asignatura con el id: %s ha sido eliminado exitosamente!",
                        id.toString()));

                log.debug("Se ha eliminado la proyeccion con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            log.error("Error al intentar eliminar la proyeccion de asignatura con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<AsignaturaEntity> findAllByFolioById(Long id_folio) {
        log.debug("Se ha ejecutado el metodo findAllByFolioById");
        folioAsignaturaEntity = folioAsignaturaRepository.findById(id_folio)
                .orElseThrow(()-> new ResourceNotFoundException((" No se encontro folio..."),
                HttpStatus.NOT_FOUND));

        try {
            return asignaturaRepository.findAllByFolio(folioAsignaturaEntity);
        } catch (Exception e) {
            log.error("Error al intentar traer la lista de proyecciones de asignatura con el id folio: ".concat(id_folio.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<IComparacionAsignaturaDto> showComparativeAsignaturaByIdsFolios(Long id_folio_1, Long id_folio_2) {
        log.debug("Se ha ejecutado el metodo showComparativeAsignaturaByIdsFolios");
        try {
            return asignaturaRepository.showComparativeAsignaturaByIdsFolios(id_folio_1, id_folio_2);
        } catch (Exception e) {
            log.error("Error al intentar ejecutar el metodo showComparativeAsignaturaByIdsFolios: ".concat("id folio 1: " + id_folio_1.toString()).concat("id folio 2: " + id_folio_2.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public IComparacionAsignaturaDto showComparativeAsignaturaByIdsFoliosByIdDocente(Long id_folio_1, Long id_folio_2, Long id_docente) {
        log.debug("Se ha ejecutado el metodo showComparativeAsignaturaByIdsFoliosByIdDocente");
        try {
            Optional<IComparacionAsignaturaDto> tableComparable = asignaturaRepository.showComparativeAsignaturaByIdsFoliosAndDocenteId(id_folio_1, id_folio_2, id_docente);
            return tableComparable.orElse(null);
        } catch (Exception e) {
            log.error("Error al intentar ejecutar el metodo showComparativeAsignaturaByIdsFolios: ".concat("id folio 1: " + id_folio_1.toString()).concat("id folio 2: " + id_folio_2.toString())
                    .concat("id docente: " + id_docente.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public AsignaturaEntity getAsignaturaById(Long id) {
        log.debug("Se ha ejecutado el metodo getAsignaturaById");
        return asignaturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException((" No se encontro la proyeccion asignatura con el id..."
                .concat(id.toString())), HttpStatus.NOT_FOUND));
    }

}
