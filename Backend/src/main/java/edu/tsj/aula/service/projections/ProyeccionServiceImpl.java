package edu.tsj.aula.service.projections;

import edu.tsj.aula.persistance.models.projections.entity.ProyeccionEntity;
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
    public ProyeccionEntity getProyeccionById(Long id) {
        return proyeccionRepository.findById(id).get();
        // debe cambiarse a optional por seguridad
    }

    @Transactional
    @Override
    public List<ProyeccionEntity> getAllProyecciones() {
        return proyeccionRepository.findAll();
    }

    @Transactional
    @Override
    public ProyeccionEntity createProyeccion(ProyeccionEntity proyeccion) {

        return proyeccionRepository.save(proyeccion);
    }
}
