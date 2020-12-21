package com.example.demo.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.NotEmpty;

@NoArgsConstructor
@Data
public class Post {
    @Id
    private String id;
    private String message;
    private Long timestamp;
    @DBRef
    private Thread thread;

    public Post(String message, Long timestamp, Thread thread) {
        this.message = message;
        this.timestamp = timestamp;
        this.thread = thread;
    }
}
