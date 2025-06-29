package com.puertogames.puertogames.repository;

import com.puertogames.puertogames.model.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
}
