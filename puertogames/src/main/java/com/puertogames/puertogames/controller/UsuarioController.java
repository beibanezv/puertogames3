package com.puertogames.puertogames.controller;

import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @PostMapping("/login")
    public boolean login(@RequestParam String nombreUsuario, @RequestParam String contrasena) {
        // Lógica de autenticación simple (ejemplo)
        // Reemplaza esto con la validación real según tu aplicación
        return "usuario".equals(nombreUsuario) && "contrasena".equals(contrasena);
    }
}
