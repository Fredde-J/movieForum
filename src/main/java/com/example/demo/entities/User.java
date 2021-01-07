package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;
import java.util.List;
@Data
public class User {

    @Id
    private String id;
    @Size(min = 4, max = 15 )
    private String username;
    @NotEmpty
    @Size(min = 4, max = 30 )
    @Email
    private String email;
    @Size(min = 6, max = 20 )
    private String password;
    @NotEmpty
    private List<@NotEmpty String> roles;


    public User(String username, String email, String password,List<String> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public User() {
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}
