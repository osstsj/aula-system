package edu.tsj.aula.service.projections;


import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaRequestDto;
import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaResponseDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.mapper.AsignaturaMapper;
import edu.tsj.aula.persistance.repository.projections.AsignaturaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class AsignaturaServiceImpl implements IAsignaturaService {
    private final AsignaturaRepository asignaturaRepository;
    private final AsignaturaMapper mapper;

    @Transactional
    @Override
    public AsignaturaEntity createAsignatura(AsignaturaEntity asignaturaRequest) {
        log.debug("Se ha ejecutado el metodo createAsignatura");
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
//        AsignaturaEntity entity = mapper.requestToEntity(asignaturaRequest);
        return asignaturaRepository.save(asignaturaRequest);

//        var result = mapper.entityToResponse(entity);
//        return  asignaturaRequest;
    }

    @Override
    public List<AsignaturaEntity> findAllByUnidad_academica(List<String> unidad_academica) {
        return asignaturaRepository.findAllByUnidad_academica(unidad_academica);
    }

    @Transactional
    @Override
    public AsignaturaEntity getAsignaturaById(Long id) {
        log.debug("Se ha ejecutado el metodo getAsignaturaById");
        return asignaturaRepository.findById(id).get();
    }

    @Override
    public List<AsignaturaEntity> getAsignaturas() {
        return asignaturaRepository.findAll();
    }


}
