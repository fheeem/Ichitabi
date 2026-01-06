package com.ichiban.ichitabi.review.controller;

import com.ichiban.ichitabi.review.dto.ReviewListDto;
import com.ichiban.ichitabi.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/write")
    public String writeReview() {
        return "reviews/write";
    }

    @GetMapping("/reviews")
    public String reviewsList(Model model) {
        List<ReviewListDto> reviewListDtos = reviewService.selectReviewList();

        model.addAttribute("reviewList", reviewListDtos);

        return "reviews/reviews";
    }

//    temporary mapping -> to be updated using reviewId value
    @GetMapping("/detail/{id}")
    public String reviewDetail() {
        return "reviews/detail";
    }
}
