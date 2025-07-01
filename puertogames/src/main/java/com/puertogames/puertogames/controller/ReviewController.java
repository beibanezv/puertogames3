package com.puertogames.puertogames.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.puertogames.puertogames.model.Juego;
import com.puertogames.puertogames.model.Review;
import com.puertogames.puertogames.model.ReviewRequest;
import com.puertogames.puertogames.model.Usuario;
import com.puertogames.puertogames.repository.JuegoRepository;
import com.puertogames.puertogames.repository.ReviewRepository;
import com.puertogames.puertogames.repository.UsuarioRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JuegoRepository juegoRepository;

    @GetMapping
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @GetMapping("/juego/{juegoId}")
    public List<Review> getByJuego(@PathVariable Long juegoId) {
        return reviewRepository.findByJuegoId(juegoId);
    }

    @PostMapping
    public Review create(@RequestBody ReviewRequest req) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(req.usuarioNombre);
        if (usuario == null) {
            usuario = new Usuario();
            usuario.setNombreUsuario(req.usuarioNombre);
            usuario.setContrasena(""); // sin contraseña
            usuario = usuarioRepository.save(usuario);
        }
        Juego juego = juegoRepository.findById(req.juegoId).orElse(null);
        if (juego == null) throw new RuntimeException("Juego no encontrado");
        Review review = new Review();
        review.setUsuario(usuario);
        review.setJuego(juego);
        review.setComentario(req.comentario);
        review.setRating(req.rating);
        return reviewRepository.save(review);
    }

    // Proxy para FreeToGame API para evitar CORS
    @GetMapping("/proxy/freetogame")
    public ResponseEntity<String> proxyFreeToGame(@RequestParam(required = false) String id) {
        String url = "https://www.freetogame.com/api/games";
        if (id != null) url += "?id=" + id;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }
}
