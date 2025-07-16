package com.puertogames.puertogames.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.puertogames.puertogames.model.Usuario;

// Repositorio para la entidad Usuario
// Permite operaciones CRUD sobre la tabla de usuarios y búsqueda por nombre de usuario
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNombreUsuario(String nombreUsuario); // Busca usuario por nombre
}
