package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByEmail(username);
        if(user == null) {
            throw new UsernameNotFoundException("Username " + username + " not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(), getGrantedAuthorities(user));
    }
    private Collection<GrantedAuthority> getGrantedAuthorities(User user) {
        //return user.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // ROLE_ADMIN -> ADMIN
                .collect(Collectors.toList());
    }

    public Boolean checkUserRole(String role) {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().toUpperCase().equals("ROLE_"+role));
    }
    public User getCurrentUser() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        User currentUser = userService.findByEmail(email);
        if(currentUser == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return currentUser;
    }

}
