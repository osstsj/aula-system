package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UnidadMapper {
    // Entity -> ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.tipo_unidad", target = "tipo_unidad")
    @Mapping(source = "entity.clave_dgp", target = "clave_dgp")
    @Mapping(source = "entity.abreviatura", target = "abreviatura")
    @Mapping(source = "entity.nombre_corto", target = "nombre_corto")
    @Mapping(source = "entity.nombre_completo", target = "nombre_completo")
    @Mapping(source = "entity.direccion_completa", target = "direccion_completa")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    UnidadResponseDto entityToResponse(UnidadEntity entity);




    // RequestDto -> Entity
    @Mapping(source = "request.tipo_unidad", target = "tipo_unidad")
    @Mapping(source = "request.clave_dgp", target = "clave_dgp")
    @Mapping(source = "request.abreviatura", target = "abreviatura")
    @Mapping(source = "request.nombre_corto", target = "nombre_corto")
    @Mapping(source = "request.nombre_completo", target = "nombre_completo")
    @Mapping(source = "request.direccion_completa", target = "direccion_completa")
    UnidadEntity requestToEntity(UnidadRequestDto request);

}
