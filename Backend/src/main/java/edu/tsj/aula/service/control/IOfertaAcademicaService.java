package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaResposeDto;

import java.util.HashMap;
import java.util.List;

public interface IOfertaAcademicaService {
    OfertaAcademicaResposeDto createOfertaAcademica(OfertaAcademicaRequestDto ofertaAcademicaRequestDto);

    List<OfertaAcademicaResposeDto> getAllOfertasAcademicas();

    OfertaAcademicaResposeDto getOfertaAcademicaById(Long id);

    OfertaAcademicaResposeDto updateOfertaAcademicaById(Long id, OfertaAcademicaRequestDto ofertaAcademicaRequestDto);

    HashMap<String, String> deleteOfertaAcademicaById(Long id);

}
