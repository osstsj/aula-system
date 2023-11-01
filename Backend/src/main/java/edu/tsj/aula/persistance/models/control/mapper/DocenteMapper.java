package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DocenteMapper {
     // Entity -> Response
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.nombre", target = "nombre")
    @Mapping(source = "entity.apellido_paterno",target = "apellido_paterno")
    @Mapping(source = "entity.apellido_materno", target = "apellido_materno")
    //@Mapping(source = "entity.unidad_academica",target = "unidad_academica")
    @Mapping(source = "entity.categoria", target = "categoria")
    @Mapping(source = "entity.actividad",target = "actividad")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    DocenteResponseDto entityToRespose(DocenteEntity entity);

    // RequestDto -> Entity
    @Mapping(source = "request.nombre", target = "nombre")
    @Mapping(source = "request.apellido_paterno", target = "apellido_paterno")
    @Mapping(source = "request.apellido_materno", target = "apellido_materno")
    //@Mapping(source = "request.unidad_academica", target = "unidad_academica")
    @Mapping(source = "request.categoria", target = "categoria")
    @Mapping(source = "request.actividad", target = "actividad")
    DocenteEntity requestToEntity(DocenteRequestDto request);
}