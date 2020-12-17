package com.example.demo.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@Data
public class Post {
    @Id
    private String id;
    private String message;
    private Long timestamp;

    public Post(String message, Long timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }
}
