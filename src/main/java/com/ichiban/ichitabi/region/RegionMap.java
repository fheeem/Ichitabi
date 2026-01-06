package com.ichiban.ichitabi.region;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Getter
@RequiredArgsConstructor
public enum RegionMap {
//    HOKKAIDO("hokkaido", "fragment/hokkaido_map"),
//    TOHOKU("tohoku", "fragment/tohoku_map"),
    KANTO(
        "kanto",
        "관동지방",
        "일본의 중심 - 관동지방",
        "fragment/kanto_map",
        List.of(
            "/images/kanto_01.webp",
            "/images/kanto_02.jpg",
            "/images/kanto_03.webp"
        )
    );
//    HOKURIKU("hokuriku", "fragment/hokuriku_map"),
//    TOKAI("tokai", "fragment/tokai_map"),
//    KANSAI("kansai", "fragment/kansai_map"),
//    CHUGOKU("chugoku", "fragment/chugoku_map"),
//    SHIKOKU("shikoku", "fragment/shikoku_map"),
//    KYUSHU("kyushu", "fragment/kyushu_map"),
//    OKINAWA("okinawa", "fragment/okinawa_map");

    private final String regionCode;        // path variable key
    private final String displayName;       // breadcrumb / title
    private final String introMessage;      // page intro
    private final String fragmentPath;      // thymeleaf fragment
    private final List<String> carouselImages;   // carousel images

    public static RegionMap from(String region) {
        return Arrays.stream(values())
                .filter(r -> r.regionCode.equalsIgnoreCase(region))
                .findFirst()
                .orElse(null);
    }
}
