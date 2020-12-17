package com.example.demo.services;

import com.example.demo.entities.Thread;
import com.example.demo.repositories.ThreadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ThreadService {
    @Autowired
    ThreadRepo threadRepo;

    public Thread findByid(String id) {
        return threadRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found with id:"+ id));
    }

    public Thread save(Thread thread) {
        return threadRepo.save(thread);
    }

    public void deleteById(String id) {
        if(!threadRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found by id: "+id);
        }
        threadRepo.deleteById(id);
    }
}