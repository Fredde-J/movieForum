package com.example.demo.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Data
@NoArgsConstructor
public class Thread {
    @Id
    private String id;
    private String title;
    private Long timestamp;
    @DBRef
    private List<Post> posts;
    @DBRef
    private Category category;


    public Thread(String title, Long timestamp, List<Post> posts, Category category) {
        this.title = title;
        this.timestamp = timestamp;
        this.posts = posts;
        this.category=category;
    }
}
