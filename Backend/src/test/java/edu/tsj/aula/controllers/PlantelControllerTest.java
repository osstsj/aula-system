package edu.tsj.aula.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

//@WebMvcTest(PlantelController.class)
//@ExtendWith(SpringExtension.class)
public class PlantelControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private PlantelServiceImpl plantelServiceImplMock;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//
//
//    // POST: Save plantel - Positive scenario
//    @Test
//    public void givenPlantelObject_whenCreatePlantel_thenReturnSavedPlantel() throws Exception {
//        // Given: Precondition or setup
//        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of( "America/Mexico_City" ));
//        PlantelEntity plantelEntity = PlantelEntity.builder()
//                .tipoUnidad("Unidad")
//                .claveDGP("14EIT0003A")
//                .abreviatura("AR")
//                .nombreCorto("ARANDAS")
//                .nombreCompleto("ARANDAS")
//                .nombreExtension("N/A")
//                .direccionCompleta("Av. José Guadalupe Tejeda 557 Arandas, Jalisco.")
//                .fechaCreacion(localDateTime)
//                .build();
//
//        given(plantelServiceImplMock.createPlantel(any(PlantelEntity.class)))
//                .willAnswer((invocationOnMock) -> invocationOnMock.getArgument(0));
//
//        // WHEN: action or behaviour that are going test
//        when(plantelServiceImplMock.createPlantel(any(PlantelEntity.class))).thenReturn(plantelEntity);
//
//        ResultActions response = mockMvc.perform(post("/api/v1/plantel")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(plantelEntity)));
//
//        // THEN: verify the result or output using assert statements
//        response.andDo(print())
//                .andExpect(jsonPath("$.tipoUnidad",
//                        is(plantelEntity.getTipoUnidad())))
//                .andExpect(jsonPath("$.clave_dgp",
//                        is(plantelEntity.getClaveDGP())))
//                .andExpect(jsonPath("$.abreviatura",
//                        is(plantelEntity.getAbreviatura())))
//                .andExpect(jsonPath("$.nombreCorto",
//                        is(plantelEntity.getNombreCorto())))
//                .andExpect(jsonPath("$.nombreCompleto",
//                        is(plantelEntity.getNombreCompleto())))
//                .andExpect(jsonPath("$.nombre_extension",
//                        is(plantelEntity.getNombreExtension())))
//                .andExpect(jsonPath("$.direccionCompleta",
//                        is(plantelEntity.getDireccionCompleta())))
//                .andExpect(jsonPath("$.fechaCreacion",
//                        is(plantelEntity.getFechaCreacion().toString())));
//    }

    // POST: Save plantel - Negative scenario
//    @Test
//    public void givenPlantelObject_whenCreateExistingPlantel_thenReturnResourceNotFound() throws Exception {
//        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of( "America/Mexico_City" ));
//        Plantel plantel1 = Plantel.builder()
//                .tipoUnidad("Unidad")
//                .clave_dgp("14EIT0003A")
//                .abreviatura("AR")
//                .nombreCorto("ARANDAS")
//                .nombreCompleto("ARANDAS")
//                .nombre_extension("N/A")
//                .direccionCompleta("Av. José Guadalupe Tejeda 557 Arandas, Jalisco.")
//                .fechaCreacion(localDateTime)
//                .build();
//
//        Plantel plantel2 = Plantel.builder()
//                .tipoUnidad("Unidad")
//                .clave_dgp("14EIT0003A")
//                .abreviatura("AR")
//                .nombreCorto("ARANDAS")
//                .nombreCompleto("ARANDAS")
//                .nombre_extension("N/A")
//                .direccionCompleta("Av. José Guadalupe Tejeda 557 Arandas, Jalisco.")
//                .fechaCreacion(localDateTime)
//                .build();
//
//        // Given: Precondition or setup
//        given(plantelServiceMock.savePlantel(any(Plantel.class)))
//                .willAnswer((invocationOnMock) -> invocationOnMock.getArgument(2));
//
//        // WHEN: action or behaviour that are going test
//        when(plantelServiceMock.savePlantel(any(Plantel.class))).thenReturn(plantel1);
//        when(plantelServiceMock.savePlantel(any(Plantel.class))).thenReturn(plantel2);
//
//      mockMvc.perform(post("/api/v1/plantel")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(plantel1)));
//        ResultActions response2 = mockMvc.perform(post("/api/v1/plantel")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(plantel2)));
//
//        // THEN: verify the result or output using assert statements
//        assertEquals(String.format("El plantel se encuentra registrado con el id '{0}' y nombre: '{1}'", plantel2.getId(), plantel2.getNombreCompleto()), response2);
//    }
}
