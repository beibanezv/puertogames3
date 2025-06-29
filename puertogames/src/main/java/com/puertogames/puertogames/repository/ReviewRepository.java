package com.puertogames.puertogames.repository;

import com.puertogames.puertogames.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
