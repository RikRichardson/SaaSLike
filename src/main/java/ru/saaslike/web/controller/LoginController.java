package ru.saaslike.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.saaslike.web.dto.WebErrorDetail;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Controller
// использован код с
// https://support.pivotal.io/hc/en-us/articles/202653598-Performing-an-AJAX-login-with-Spring-Security-3-0-2002229-
public class LoginController {

    @Autowired()
    @Qualifier("authenticationManager")
    AuthenticationManager authenticationManager;

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    // не закончено, не используется в текущей конфигурации
    // TODO закончить реализацию входа с помощью ajax-запроса
    //    @RequestMapping(value = "login", method = RequestMethod.POST)
    //    @ResponseBody
    public Authentication performLogin(
        @RequestParam("username") String username,
        @RequestParam("password") String password,
        HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(username, password);
        Authentication auth = authenticationManager.authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(auth);

        return auth;
    }

    @ExceptionHandler({ BadCredentialsException.class, DisabledException.class, LockedException.class })
    @ResponseBody
    public WebErrorDetail authError(HttpServletRequest request, Exception exception) {

        return new WebErrorDetail(BAD_REQUEST.value(), exception.getLocalizedMessage(),
            request.getRequestURL().toString());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public WebErrorDetail undefinedError(HttpServletRequest request, Exception exception) {

        return new WebErrorDetail(BAD_REQUEST.value(), exception.getLocalizedMessage(), request.getRequestURL().toString());
    }

}
