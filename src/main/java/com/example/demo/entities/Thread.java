package com.example.demo.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
public class Thread {
    @Id
    private String id;
    @Size(min = 3, max = 20 )
    private String title;
    @NotNull
    private Long timestamp;
    @Valid
    @DBRef
    private Category category;
    @Valid
    @DBRef
    private User user;
    private Boolean isLocked;


    public Thread(String title, Long timestamp, Category category, User user, boolean isLocked) {
        this.title = title;
        this.timestamp = timestamp;
        this.category = category;
        this.user = user;
        this.isLocked = isLocked;
    }
}
