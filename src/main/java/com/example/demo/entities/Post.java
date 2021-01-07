package com.example.demo.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Data
public class Post {
    @Id
    private String id;
    @Size(min = 20, max = 1000)
    private String message;
    @NotNull
    private Long timestamp;
    @Valid
    @DBRef
    private Thread thread;
    @Valid
    @DBRef
    private User user;

    public Post(String message, Long timestamp, Thread thread, User user) {
        this.message = message;
        this.timestamp = timestamp;
        this.thread = thread;
        this.user = user;
    }
}
