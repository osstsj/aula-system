package edu.tsj.aula.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.tsj.aula.model.Plantel;
import edu.tsj.aula.service.implementation.PlantelService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(PlantelController.class)
@ExtendWith(SpringExtension.class)
public class PlantelControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlantelService plantelServiceMock;

    @Autowired
    private ObjectMapper objectMapper;


    // POST: Save plantel - Positive scenario
    @Test
    public void givenPlantelObject_whenCreatePlantel_thenReturnSavedPlantel() throws Exception {
        // Given: Precondition or setup
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of( "America/Mexico_City" ));
        Plantel plantel = Plantel.builder()
                .tipoUnidad("Unidad")
                .clave_dgp("14EIT0003A")
                .abreviatura("AR")
                .nombreCorto("ARANDAS")
                .nombreCompleto("ARANDAS")
                .nombre_extension("N/A")
                .direccionCompleta("Av. José Guadalupe Tejeda 557 Arandas, Jalisco.")
                .fechaCreacion(localDateTime)
                .build();

        given(plantelServiceMock.savePlantel(any(Plantel.class)))
                .willAnswer((invocationOnMock) -> invocationOnMock.getArgument(0));

        // WHEN: action or behaviour that are going test
        when(plantelServiceMock.savePlantel(any(Plantel.class))).thenReturn(plantel);

        ResultActions response = mockMvc.perform(post("/api/v1/plantel")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(plantel)));

        // THEN: verify the result or output using assert statements
        response.andDo(print())
                .andExpect(jsonPath("$.tipoUnidad",
                        is(plantel.getTipoUnidad())))
                .andExpect(jsonPath("$.clave_dgp",
                        is(plantel.getClave_dgp())))
                .andExpect(jsonPath("$.abreviatura",
                        is(plantel.getAbreviatura())))
                .andExpect(jsonPath("$.nombreCorto",
                        is(plantel.getNombreCorto())))
                .andExpect(jsonPath("$.nombreCompleto",
                        is(plantel.getNombreCompleto())))
                .andExpect(jsonPath("$.nombre_extension",
                        is(plantel.getNombre_extension())))
                .andExpect(jsonPath("$.direccionCompleta",
                        is(plantel.getDireccionCompleta())))
                .andExpect(jsonPath("$.fechaCreacion",
                        is(plantel.getFechaCreacion().toString())));
    }
}
