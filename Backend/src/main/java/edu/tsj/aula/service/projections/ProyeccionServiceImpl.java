package edu.tsj.aula.service.projections;

import edu.tsj.aula.persistance.models.projections.entity.FolioEntity;
import edu.tsj.aula.persistance.repository.projections.ProyeccionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class ProyeccionServiceImpl implements IProyeccionService {
    private final ProyeccionRepository proyeccionRepository;

    @Transactional
    @Override
    public FolioEntity getProyeccionById(Long id) {
        return proyeccionRepository.findById(id).get();
        // debe cambiarse a optional por seguridad
    }

    @Transactional
    @Override
    public List<FolioEntity> getAllProyecciones() {
        return proyeccionRepository.findAll();
    }

    @Transactional
    @Override
    public FolioEntity createProyeccion(FolioEntity proyeccion) {
        proyeccion.setFolio(proyeccion.getLetra()
                .concat(proyeccion.getNumero().toString())
                .concat("-")
                .concat(proyeccion.getPeriodo().toString())
                .concat(proyeccion.getPeriodoAoB())
        );

        return proyeccionRepository.save(proyeccion);
    }
}
