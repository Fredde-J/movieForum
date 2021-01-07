package com.example.demo.controllers;

import com.example.demo.entities.Category;
import com.example.demo.entities.Post;
import com.example.demo.entities.Thread;
import com.example.demo.repositories.ThreadRepo;
import com.example.demo.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Thread> saveTread(@Valid @RequestBody Thread thread){
        return ResponseEntity.ok(threadService.save(thread));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateThread(@PathVariable String id, @Valid @RequestBody Thread thread){
        System.out.println(thread);
        threadService.updateThread(id,thread);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteThread(@PathVariable String id){
        threadService.deleteById(id);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
