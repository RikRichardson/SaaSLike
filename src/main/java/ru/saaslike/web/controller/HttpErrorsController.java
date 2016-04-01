package ru.saaslike.web.controller;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Отдельный контроллер для обработки кодов ошибок http
 */
@Controller
public class HttpErrorsController {

    // TODO вернуть мапинг, убран потому что мешает отладке в браузере - линие запросы разлогинивают пользователя
    @RequestMapping(value = "/error/404")
    public String notFound(HttpServletRequest request) throws ServletException {
        // здесь описано, почему не сработает простой редирект на /logout
        // http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#csrf-logout
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(null);

        SecurityContextHolder.clearContext();

        return "redirect:/login";
    }
}
