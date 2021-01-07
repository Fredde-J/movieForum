package com.example.demo.controllers;

import com.example.demo.entities.Post;
import com.example.demo.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/{id}")
    public ResponseEntity<Post> getThreadById(@PathVariable String id) {
        return ResponseEntity.ok(postService.findByid(id));
    }

    @GetMapping("/getPostsByThreadId/{id}")
    public ResponseEntity<List<Post>> getPostsByThreadId(@PathVariable String id) {
        return ResponseEntity.ok(postService.findByThreadId(id));
    }


    @PostMapping
    public ResponseEntity<Post> savePost(@Valid @RequestBody Post post) {
        return ResponseEntity.ok(postService.save(post));
    }
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteThread(@PathVariable String id) {
        postService.deleteById(id);
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
