package com.example.demo.controllers;

import com.example.demo.entities.Thread;
import com.example.demo.repositories.ThreadRepo;
import com.example.demo.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/threads")
public class ThreadController {
    @Autowired
    ThreadService threadService;

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable String id){
       return ResponseEntity.ok(threadService.findByid(id));
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
