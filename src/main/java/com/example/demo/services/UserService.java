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
    

    public User save (User user) {
        if(StringUtils.isEmpty(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "I need a password!!");
        }
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User findById(String id) {
      return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not found user by id %s", id)));
    }

    public void update(String id, User user) {
        if(!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not find the user by id %s.", id));
        }
        user.setId(id);
       // user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public void delete(String id) {
        if(!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Could not find the user by id %s.", id));
        }
        userRepo.deleteById(id);
    }


}
