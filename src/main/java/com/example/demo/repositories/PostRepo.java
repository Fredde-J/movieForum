package com.example.demo.repositories;

import com.example.demo.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepo extends MongoRepository<Post, String> {
}
