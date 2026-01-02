package com.ichiban.ichitabi.region.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("region")
public class RegionController {

    @GetMapping("/list")
    public String regionsList() {
        return "region/region";
    }

//    temporary mapping -> need to be updated for each regions / cities
    @GetMapping("/detail/kanto")
    public String regionDetail() {
        return "region/map";
    }
}
