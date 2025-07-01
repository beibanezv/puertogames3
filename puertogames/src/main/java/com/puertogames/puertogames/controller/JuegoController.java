package com.puertogames.puertogames.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.service.JuegoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/juegos")
public class JuegoController {

    @Autowired
    private JuegoService juegoService;

    @GetMapping
    public List<Juego> getAll() {
        return juegoService.getAllJuegos();
    }

    @PostMapping
    public Juego create(@RequestBody Juego juego) {
        return juegoService.createJuego(juego);
    }

    @PutMapping("/{id}")
    public Juego update(@PathVariable Long id, @RequestBody Juego juego) {
        return juegoService.updateJuego(id, juego);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        juegoService.deleteJuego(id);
    }
}
