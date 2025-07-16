package com.puertogames.puertogames.service;

// Importaciones necesarias para el servicio
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.repository.JuegoRepository;

@Service // Servicio de lógica de negocio para juegos
public class JuegoService {

    @Autowired // Inyección del repositorio de juegos
    private JuegoRepository repo;

    // Devuelve todos los juegos
    public List<Juego> getAllJuegos() {
        return repo.findAll();
    }

    // Crea un nuevo juego
    public Juego createJuego(Juego juego) {
        return repo.save(juego);
    }

    // Actualiza un juego existente
    public Juego updateJuego(Long id, Juego juego) {
        return repo.findById(id)
            .map(j -> {
                // Actualiza los campos del juego
                j.setNombre(juego.getNombre());
                j.setGenero(juego.getGenero());
                j.setPlataforma(juego.getPlataforma());
                j.setCalificacion(juego.getCalificacion());
                j.setDescripcion(juego.getDescripcion());
                j.setImagenUrl(juego.getImagenUrl());
                j.setFechaLanzamiento(juego.getFechaLanzamiento());
                j.setDesarrollador(juego.getDesarrollador());
                j.setPrecio(juego.getPrecio());
                j.setStock(juego.getStock());
                j.setIdioma(juego.getIdioma());
                return repo.save(j);
            })
            .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
    }

    // Elimina un juego por ID
    public void deleteJuego(Long id) {
        repo.deleteById(id);
    }
}
