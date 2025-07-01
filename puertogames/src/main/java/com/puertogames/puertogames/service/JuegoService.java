package com.puertogames.puertogames.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.repository.JuegoRepository;

@Service
public class JuegoService {

    @Autowired
    private JuegoRepository repo;

    public List<Juego> getAllJuegos() {
        return repo.findAll();
    }

    public Juego createJuego(Juego juego) {
        return repo.save(juego);
    }

    public Juego updateJuego(Long id, Juego juego) {
        return repo.findById(id)
            .map(j -> {
                j.setNombre(juego.getNombre());
                j.setGenero(juego.getGenero());
                j.setPlataforma(juego.getPlataforma());
                j.setCalificacion(juego.getCalificacion());
                return repo.save(j);
            })
            .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
    }

    public void deleteJuego(Long id) {
        repo.deleteById(id);
    }
}
