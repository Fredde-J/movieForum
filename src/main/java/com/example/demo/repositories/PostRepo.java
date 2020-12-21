package com.example.demo.repositories;

import com.example.demo.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends MongoRepository<Post, String> {
    @Query("{'thread.id': ?0}")
    List<Post> findByThreadId(String id);
}
