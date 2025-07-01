package com.puertogames.puertogames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.puertogames.puertogames.model.Review;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByJuegoId(Long juegoId);
}
