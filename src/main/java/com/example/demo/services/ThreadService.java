package com.example.demo.services;

import com.example.demo.entities.Category;
import com.example.demo.entities.Thread;
import com.example.demo.entities.User;
import com.example.demo.repositories.CategoryRepo;
import com.example.demo.repositories.ThreadRepo;
import com.example.demo.repositories.UserRepo;
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
    @Autowired
    UserRepo userRepo;
    @Autowired
    CategoryRepo categoryRepo;
    @Autowired
    PostService postService;

    public Thread findByid(String id) {
        return threadRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found with id:"+ id));
    }

    public List<Thread> findAll() {
        return threadRepo.findAll();
    }

    public List<Thread> findByCategoryId(String id) {
    return threadRepo.findByCategoryId(id);
    }

    public Thread save(Thread thread)
    {
        if(!userRepo.existsById(thread.getUser().getId()) || !categoryRepo.existsById(thread.getCategory().getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("could not find user or category in database"));
        }
        return threadRepo.save(thread);
    }

    public void updateThread(String id, Thread thread) {
        if(!threadRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find thread by id:" + id));
        }
        User user = myUserDetailsService.getCurrentUser();
        if(!user.getId().equals(thread.getCategory().getUser().getId())&&!user.getRoles().contains("ADMIN")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("only admins or a editor for this thread can update it"));
        }
       thread.setId(id);
       threadRepo.save(thread);
    }

    public void deleteById(String id) {
        if(!threadRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"thread not found by id: "+id);
        }
        Thread thread = findByid(id);
        User user = myUserDetailsService.getCurrentUser();
        System.out.println("test" + user.getId()+"   "+ thread.getCategory().getUser().getId());
        if(!user.getId().equals(thread.getCategory().getUser().getId())&&!user.getRoles().contains("ADMIN")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("only admins or a editor for this thread can delete it"));
        }
        postService.deleteByThreadId(id);
        threadRepo.deleteById(id);
    }
}
