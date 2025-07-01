package com.puertogames.puertogames.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validarLogin(String nombreUsuario, String contrasena) {
        var usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);
        return usuario != null && usuario.getContrasena().equals(contrasena);
    }

    public boolean usuarioExiste(String nombreUsuario) {
    return usuarioRepository.findByNombreUsuario(nombreUsuario) != null;
}

public Usuario registrarUsuario(Usuario usuario) {
    return usuarioRepository.save(usuario);
}

}
