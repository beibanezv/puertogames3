package com.puertogames.puertogames.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.puertogames.puertogames.model.Juego;

/**
 * Repositorio para la entidad Juego.
 * Permite operaciones CRUD sobre la tabla de juegos en la base de datos.
 */
@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
}
