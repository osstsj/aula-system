package edu.tsj.aula.persistance.models.projections.mapper;

import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaRequestDto;
import edu.tsj.aula.persistance.models.projections.dto.asignatura.AsignaturaResponseDto;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

//@Mapper(componentModel = "spring", unmappedTargetPolicy =  ReportingPolicy.IGNORE)
public interface AsignaturaMapper {
    // Entity -> ResponseDTO
//    @Mapping(source = "entity.id", target = "id")
//    @Mapping(source = "entity.unidad_academica", target = "unidad_academica")
//    @Mapping(source = "entity.profe_asignatura", target = "profe_asignatura")
//    @Mapping(source = "entity.horas_sustantivas_atencion_alumnos", target = "horas_sustantivas_atencion_alumnos")
//    @Mapping(source = "entity.horas_necesidad_institucional", target = "horas_necesidad_institucional")
//    @Mapping(source = "entity.total", target = "total")
//    @Mapping(source = "entity.observaciones", target = "observaciones")
//    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
//    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
//    AsignaturaResponseDto entityToResponse(AsignaturaEntity entity);
//
//    // RequestDto -> Entity
//    @Mapping(source = "request.unidad_academica", target = "unidad_academica")
//    @Mapping(source = "request.profe_asignatura", target = "profe_asignatura")
//    @Mapping(source = "request.horas_sustantivas_atencion_alumnos", target = "horas_sustantivas_atencion_alumnos")
//    @Mapping(source = "request.horas_necesidad_institucional", target = "horas_necesidad_institucional")
//    @Mapping(source = "request.total", target = "total")
//    @Mapping(source = "request.observaciones", target = "observaciones")
//    AsignaturaEntity requestToEntity(AsignaturaRequestDto request);
}
