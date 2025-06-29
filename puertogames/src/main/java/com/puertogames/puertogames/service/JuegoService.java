
package com.puertogames.puertogames.service;


import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.repository.JuegoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;




@Service
public class JuegoService {

    @Autowired
    private JuegoRepository juegoRepository;

    public List<Juego> listarJuegos() {
        return juegoRepository.findAll();
    }

    public Juego guardarJuego(Juego juego) {
        return juegoRepository.save(juego);
    }

    public Optional<Juego> editarJuego(Long id, Juego juegoActualizado) {
        return juegoRepository.findById(id).map(juego -> {
            juego.setNombre(juegoActualizado.getNombre());
            // Actualiza otros campos según tu modelo
            return juegoRepository.save(juego);
        });
    }

    public void eliminarJuego(Long id) {
        juegoRepository.deleteById(id);
    }

    public List<Juego> getAllJuegos() {
        return juegoRepository.findAll();
    }

    public Juego createJuego(Juego juego) {
        return juegoRepository.save(juego);
    }

    public Juego updateJuego(Long id, Juego juego) {
        return juegoRepository.findById(id)
                .map(existingJuego -> {
                    existingJuego.setNombre(juego.getNombre());
                    // Actualiza otros campos según tu modelo
                    return juegoRepository.save(existingJuego);
                })
                .orElseThrow(() -> new RuntimeException("Juego no encontrado con id: " + id));
    }

    public void deleteJuego(Long id) {
        juegoRepository.deleteById(id);
    }


}
