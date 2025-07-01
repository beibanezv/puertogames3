package com.puertogames.puertogames.controller;

import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.service.JuegoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
