package com.puertogames.puertogames.controller;

import com.puertogames.puertogames.model.Review;
import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.repository.ReviewRepository;
import com.puertogames.puertogames.repository.JuegoRepository;
import com.puertogames.puertogames.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;




@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private JuegoRepository juegoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todas las reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Crear una nueva review relacionada con un juego y un usuario
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest reviewRequest) {
        Optional<Juego> juegoOpt = juegoRepository.findById(reviewRequest.getGameId());
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(reviewRequest.getUserId());

        if (juegoOpt.isEmpty() || usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Review review = new Review();
        review.setComentario(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        review.setJuego(juegoOpt.get());
        review.setUsuario(usuarioOpt.get());

        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    // DTO para recibir los datos de la review
    public static class ReviewRequest {
        private Long gameId;
        private Long userId;
        private String content;
        private int rating;

        // getters y setters
        public Long getGameId() { return gameId; }
        public void setGameId(Long gameId) { this.gameId = gameId; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public int getRating() { return rating; }
        public void setRating(int rating) { this.rating = rating; }
    }
}
