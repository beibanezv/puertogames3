package com.puertogames.puertogames.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.puertogames.puertogames.model.Review;
import com.puertogames.puertogames.repository.ReviewRepository;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @PostMapping
    public Review create(@RequestBody Review review) {
        return reviewRepository.save(review);
    }
}
