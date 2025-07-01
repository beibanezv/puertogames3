package com.puertogames.puertogames.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public boolean login(@RequestParam String nombreUsuario, @RequestParam String contrasena) {
        return usuarioService.validarLogin(nombreUsuario, contrasena);
    }

    @PostMapping("/registro")
public ResponseEntity<String> registro(@RequestParam String nombreUsuario, @RequestParam String contrasena) {
    if (usuarioService.usuarioExiste(nombreUsuario)) {
        return ResponseEntity.badRequest().body("Usuario ya existe");
    }
    try {
        Usuario nuevo = new Usuario();
        nuevo.setNombreUsuario(nombreUsuario);
        nuevo.setContrasena(contrasena);
        usuarioService.registrarUsuario(nuevo);
        return ResponseEntity.ok("Usuario registrado");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar usuario: " + e.getMessage());
    }
}

}

