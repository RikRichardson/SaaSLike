package ru.saaslike.service.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class LoginUserService implements UserDetailsService {

    //todo replace with database matching login
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return new AppUserDetails(
            "admin", "admin", Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }

}