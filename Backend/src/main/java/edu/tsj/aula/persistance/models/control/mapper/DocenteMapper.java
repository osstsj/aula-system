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
    @Mapping(source = "entity.unidad_academica",target = "unidad_academica")
    @Mapping(source = "entity.nombre_completo", target = "nombre_completo")
    @Mapping(source = "entity.categoria", target = "categoria")
    @Mapping(source = "entity.actividad",target = "actividad")
    @Mapping(source = "entity.estatus", target = "estatus")
    @Mapping(source = "entity.codigo_nomina", target = "codigo_nomina")
    @Mapping(source = "entity.ultima_horas", target = "ultima_horas")
    @Mapping(source = "entity.folio_ultimo_registro_y_tipo_folio", target = "folio_ultimo_registro_y_tipo_folio")
    @Mapping(source = "entity.realizado_por", target = "realizado_por")
    @Mapping(source = "entity.actualizado_por", target = "actualizado_por")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    DocenteResponseDto entityToRespose(DocenteEntity entity);

    // RequestDto -> Entity
    @Mapping(source = "request.nombre", target = "nombre")
    @Mapping(source = "request.apellido_paterno", target = "apellido_paterno")
    @Mapping(source = "request.apellido_materno", target = "apellido_materno")
    @Mapping(source = "request.unidad_academica",target = "unidad_academica")
    @Mapping(source = "request.nombre_completo", target = "nombre_completo")
    @Mapping(source = "request.categoria", target = "categoria")
    @Mapping(source = "request.actividad", target = "actividad")
    @Mapping(source = "request.estatus", target = "estatus")
    @Mapping(source = "request.codigo_nomina", target = "codigo_nomina")
//    @Mapping(source = "request.ultima_horas", target = "ultima_horas")
//    @Mapping(source = "request.folio_ultimo_registro_y_tipo_folio", target = "folio_ultimo_registro_y_tipo_folio")
    @Mapping(source = "request.realizado_por", target = "realizado_por")
    @Mapping(source = "request.actualizado_por", target = "actualizado_por")
    DocenteEntity requestToEntity(DocenteRequestDto request);
}
