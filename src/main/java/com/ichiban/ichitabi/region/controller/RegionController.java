package com.ichiban.ichitabi.region.controller;

import com.ichiban.ichitabi.region.RegionMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("region")
public class RegionController {

    @GetMapping("/list")
    public String regionsList() {
        return "region/region";
    }

//    temporary mapping -> need to be updated for each regions / cities
    @GetMapping("/{region}")
    public String regionDetail(
            @PathVariable String region,
            Model model
    ) {
        RegionMap regionMap = RegionMap.from(region);

        model.addAttribute("region", region);

        model.addAttribute(
                "mapFragment",
                regionMap != null ? regionMap.getFragmentPath() : null
        );
        model.addAttribute("introMessage",
                regionMap != null ? regionMap.getIntroMessage() : null
        );
        model.addAttribute("regionName",
                regionMap != null ? regionMap.getDisplayName() : null
        );
        model.addAttribute("carouselImages",
                regionMap != null ? regionMap.getCarouselImages() : null
        );

        return "region/map";
    }


}
