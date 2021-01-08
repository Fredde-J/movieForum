package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    MyUserDetailsService myUserDetailsService;
    @Autowired
    CategoryService categoryService;


    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(RuntimeException::new);
    }

    public User findById(String id) {
        return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not found user by id %s", id)));
    }

    public List<User> findAllExceptAdmins() {
        List<User> users = userRepo.findAll();
        if(users.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find users"));
        }
        users.removeIf(user -> user.getRoles().contains("ADMIN"));
        return users;
    }

    public User getCurrentUser() {
        return myUserDetailsService.getCurrentUser();
    }
    

    public User save (User user) {
        if(StringUtils.isEmpty(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "I need a password!!");
        }
        var userWithEmailExists = userRepo.findByEmail(user.getEmail()).orElse(null);
        if(userWithEmailExists==null){
            if(user.getRoles().contains("ADMIN")||user.getRoles().contains("EDITOR")){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "A new user can only have the role USER");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user with that email already exists");
        }
    }

    public void update(String id, User user) {
        if(!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not find the user by id %s.", id));
        }
        if(user.getRoles().contains("ADMIN")){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("its forbidden to make a user Admin"));
        }
        if(user.getPassword()==null){
         var userDb = userRepo.findById(user.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not found user by id %s", id)));
         user.setPassword(userDb.getPassword());
        }else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        user.setId(id);
        userRepo.save(user);
    }

    public void changeRoleAndUpdateCategories(String id, User user) {
        if(!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not find the user by id %s.", id));
        }
        if(user.getPassword()==null){
            var userDb = userRepo.findById(user.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not found user by id %s", id)));
            user.setPassword(userDb.getPassword());
        }else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        categoryService.removeUserFromCategoriesByUserId(user.getId());
        user.setId(id);
        userRepo.save(user);
    }

    public void delete(String id) {
        if(!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not find the user by id %s.", id));
        }
        categoryService.removeUserFromCategoriesByUserId(id);
        userRepo.deleteById(id);
    }






}
