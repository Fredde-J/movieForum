package com.example.demo.controllers;

import com.example.demo.entities.Post;
import com.example.demo.entities.Thread;
import com.example.demo.services.PostService;
import com.example.demo.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/{id}")
    public ResponseEntity<Post> getThreadById(@PathVariable String id){
        return ResponseEntity.ok(postService.findByid(id));
    }

    @GetMapping("/getPostsByThreadId/{id}")
    public ResponseEntity<List<Post>> getPostsByThreadId(@PathVariable String id){
        return ResponseEntity.ok(postService.findByThreadId(id));
    }

    @PostMapping
    public ResponseEntity<Post> savePost(@RequestBody Post post){
        return ResponseEntity.ok(postService.save(post));
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteThread(@PathVariable String id){
        postService.deleteById(id);
    }
}
