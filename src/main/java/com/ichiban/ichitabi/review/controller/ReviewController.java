package com.ichiban.ichitabi.review.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @GetMapping("/write")
    public String writeReview() {
        return "reviews/write";
    }

    @GetMapping("/reviews")
    public String reviewsList() {
        return "reviews/reviews";
    }

//    temporary mapping -> to be updated using reviewId value
    @GetMapping("/detail")
    public String reviewDetail() {
        return "reviews/detail";
    }
}
