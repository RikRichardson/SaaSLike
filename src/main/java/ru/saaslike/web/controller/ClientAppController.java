package ru.saaslike.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.WebInvocationPrivilegeEvaluator;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.saaslike.service.auth.AppUserDetails;
import ru.saaslike.web.dto.AppUser;

import java.util.ArrayList;
import java.util.HashSet;

@Controller
public class ClientAppController {

    @Autowired
    private WebInvocationPrivilegeEvaluator webInvocationPrivilegeEvaluator;

    @RequestMapping(value = { "/" }, method = RequestMethod.GET)
    public String index() {
        return "redirect:app";
    }

    @RequestMapping(value = { "app/*", "app" }, method = RequestMethod.GET)
    public String clientApp() {
        return "app";
    }

    /**
     * @return current user
     */
    @RequestMapping(value = "app/currentUser", method = RequestMethod.GET)
    @ResponseBody
    public AppUser currentUser() {
        return getCurrentUser();
    }

    private AppUser getCurrentUser() {
        AppUserDetails ud = (AppUserDetails) SecurityContextHolder.getContext().
            getAuthentication().getPrincipal();

        AppUser result = new AppUser(
            ud.getUsername(),
            new HashSet<>(ud.getAuthorities()),
            ud.isAccountNonExpired(),
            ud.isAccountNonLocked(),
            ud.isCredentialsNonExpired(),
            ud.isEnabled());

        return result;
    }

    /**
     * проверяет доступность url-ов для текущего пользователя
     *
     * @param urls список URL-ов через запятую
     * @return список доступных url-ов, выбранный из переданных в параметре <code>urls</code>
     */
    @RequestMapping(value = "app/allowedUrls", method = { RequestMethod.GET })
    @ResponseBody
    public String[] checkAllowed(String urls) {
        String[] empty = {};

        if (!StringUtils.hasText(urls)) {
            return empty;
        }

        String[] urlArr = urls.split("\\s*(;|,|\\s)\\s*");
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ArrayList<String> result = new ArrayList<>();

        for (String url : urlArr) {
            if (webInvocationPrivilegeEvaluator.isAllowed(url, currentUser)) {
                result.add(url);
            }
        }

        return result.toArray(empty);
    }
}
