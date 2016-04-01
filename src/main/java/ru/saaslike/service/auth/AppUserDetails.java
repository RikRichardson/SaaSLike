package ru.saaslike.service.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import ru.saaslike.domain.PortalRole;

import java.util.Collection;

public class AppUserDetails extends User {

    private static final long serialVersionUID = 3462609581145764467L;

    private final boolean isAdmin;

    public AppUserDetails(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        isAdmin = authorities.stream()
            .anyMatch(a -> a.getAuthority().equals(PortalRole.ROLE_ADMIN.name()));
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public static AppUserDetails fromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (AppUserDetails) authentication.getPrincipal();
    }
}
