package com.example.demo.services;

import com.example.demo.entities.Post;
import com.example.demo.entities.Thread;
import com.example.demo.repositories.PostRepo;
import com.example.demo.repositories.ThreadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostService {
    @Autowired
    PostRepo postRepo;

    public Post findByid(String id) {
        return postRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"post not found with id:"+ id));
    }

    public Post save(Post post) {
        return postRepo.save(post);
    }

    public void deleteById(String id) {
        if(!postRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"post not found by id: "+id);
        }
        postRepo.deleteById(id);
    }
}
