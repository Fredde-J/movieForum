package com.example.demo.controllers;

import com.example.demo.entities.Category;
import com.example.demo.entities.Post;
import com.example.demo.entities.Thread;
import com.example.demo.repositories.ThreadRepo;
import com.example.demo.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/threads")
public class ThreadController {
    @Autowired
    ThreadService threadService;

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable String id){
       return ResponseEntity.ok(threadService.findByid(id));
    }
    @GetMapping
    public ResponseEntity<List<Thread>> getAllThreads(){
        return ResponseEntity.ok(threadService.findAll());
    }

    @GetMapping("/getThreadsByCategoryId/{id}")
    public ResponseEntity<List<Thread>> getThreadsByCategoryId(@PathVariable String id){
        System.out.println("test"+ id);
        return ResponseEntity.ok(threadService.findByCategoryId(id));
    }


    @PostMapping
    public ResponseEntity<Thread> saveTread(@RequestBody Thread thread){
        return ResponseEntity.ok(threadService.save(thread));
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteThread(@PathVariable String id){
        threadService.deleteById(id);
    }
}
