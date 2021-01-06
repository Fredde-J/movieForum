package com.example.demo.services;

import com.example.demo.entities.Thread;
import com.example.demo.entities.User;
import com.example.demo.repositories.ThreadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ThreadService {
    @Autowired
    ThreadRepo threadRepo;
    @Autowired
    MyUserDetailsService myUserDetailsService;

    public Thread findByid(String id) {
        return threadRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found with id:"+ id));
    }

    public List<Thread> findAll() {
        return threadRepo.findAll();
    }

    public List<Thread> findByCategoryId(String id) {
    return threadRepo.findByCategoryId(id);
    }

    public Thread save(Thread thread) {
        return threadRepo.save(thread);
    }

    public void updateThread(String id, Thread thread) {
        if(!threadRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find thread by id:" + id));
        }
        /*
       if(!thread.getUser().getRoles().contains("EDITOR") && myUserDetailsService.checkUserRole("ADMIN")) {
        List<String> roles = thread.getUser().getRoles();
        roles.add("EDITOR");
        thread.getUser().setRoles(roles);
        }


       if(!myUserDetailsService.checkUserRole("EDITOR") || !myUserDetailsService.checkUserRole("ADMIN") ){
           throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("you need to be editor or admin for this thread to update it"));
       }
       */

       thread.setId(id);
       threadRepo.save(thread);
    }

    public void deleteById(String id) {
        if(!threadRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found by id: "+id);
        }
        threadRepo.deleteById(id);
    }
}
