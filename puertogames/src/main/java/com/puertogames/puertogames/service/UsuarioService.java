package com.puertogames.puertogames.service;

// Importaciones necesarias para el servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.repository.UsuarioRepository;

@Service // Servicio de lógica de negocio para usuarios
public class UsuarioService {

    @Autowired // Inyección del repositorio de usuarios
    private UsuarioRepository usuarioRepository;

    // Valida el login de usuario
    public boolean validarLogin(String nombreUsuario, String contrasena) {
        var usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);
        return usuario != null && usuario.getContrasena().equals(contrasena);
    }

    // Verifica si el usuario ya existe
    public boolean usuarioExiste(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario) != null;
    }

    // Registra un nuevo usuario
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

}
