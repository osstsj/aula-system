package edu.tsj.aula.service.projections.folio.fulltime;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.persistance.repository.projections.folio.FolioFulltimeRespository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class FolioFulltimeServiceImpl implements IFolioFulltimeService {
    private final FolioFulltimeRespository folioFulltimeRespository;
    private final UnidadRepository unidadRepository;
    private static UnidadEntity unidadAcademica = null; // Singleton Pattern: se intanta ahorrar memoria con una instancia global
    // Singleton Pattern

    @Transactional
    @Override
    public List<FolioFulltimeEntity> getAllFoliosFulltime() {
        return folioFulltimeRespository.findAll();
    }

    @Transactional
    @Override
    public List<FolioFulltimeEntity> getAllByFoliosAndUnidadAcademica(Long id_unidad) {
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND)
        );

        return folioFulltimeRespository.findAllByUnidad_academica(unidadAcademica);
    }

    @Transactional
    @Override
    public FolioFulltimeEntity createFolioFulltime(FolioFulltimeEntity folioFulltimeEntity, Long id_unidad) {
        unidadAcademica = unidadRepository.findById(id_unidad).orElseThrow(
                () -> new ResourceNotFoundException("No se encontro unidad academica con el id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND));

        folioFulltimeEntity.setUnidad_academica(unidadAcademica);
        folioFulltimeEntity.setFolio(folioFulltimeEntity.getUnidad_academica().getAbreviatura()
                .concat(" - ")
                .concat(folioFulltimeEntity.getNumero().toString())
                .concat(" - ")
                .concat(folioFulltimeEntity.getPeriodo().toString())
                .concat(" ")
                .concat(folioFulltimeEntity.getPeriodoAoB())
        );

        return folioFulltimeRespository.save(folioFulltimeEntity);
    }
}
