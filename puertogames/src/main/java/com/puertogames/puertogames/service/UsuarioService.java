package com.puertogames.puertogames.service;

import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public boolean validarLogin(String nombreUsuario, String contrasena) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);
        return usuario != null && usuario.getContrasena().equals(contrasena);
    }
}
