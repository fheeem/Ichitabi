package com.ichiban.ichitabi.user.controller;

import com.ichiban.ichitabi.user.dto.UserDto;
import com.ichiban.ichitabi.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입 페이지
    @GetMapping("signup")
    public String userSignupForm() {
        // templates/user/sign_up.html 파일이 존재해야 함
        return "user/sign_up";
    }

    // 로그인 페이지
    @GetMapping("login")
    public String userLoginForm() {
        // templates/user/sign_in.html 파일이 존재해야 함
        return "user/sign_in";
    }

    // 로그인 처리
    @PostMapping("login")
    public String login(
            @RequestParam String email,
            @RequestParam String pw,
            HttpSession session,
            Model model
    ) {
        UserDto loginUser = userService.login(email, pw);

        if (loginUser == null) {
            // 로그인 실패 시 에러 메시지 전달
            model.addAttribute("error", "이메일 또는 비밀번호가 틀렸습니다.");
            return "user/sign_in"; // templates/user/sign_in.html 호출
        }

        // 로그인 성공 → 세션에 저장
        session.setAttribute("loginUser", loginUser);

        // 메인 페이지로 리다이렉트
        return "redirect:/";
    }

    // 로그아웃
    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate(); // 세션 초기화
        return "redirect:/user/login"; // 로그아웃 후 로그인 페이지로
    }
}
