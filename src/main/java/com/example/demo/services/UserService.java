package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    

    public void save () {
        User user = new User("kalle","dad@ad.se","password");
         userRepo.save(user);
        System.out.println("saved");
    }

    public User findById(String id) {
      return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not found user by id %s", id)));
    }
}
