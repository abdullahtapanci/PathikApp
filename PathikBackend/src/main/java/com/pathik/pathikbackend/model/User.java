package com.pathik.pathikbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="first_name", nullable=false)
    private String firstName;

    @Column(name="last_name", nullable=false)
    private String lastName;

    @Column(name="username", nullable=false, unique = true)
    private String username;

    @Column(name="email", nullable=false, unique = true)
    private String email;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="image")
    private String image = "http://localhost:8080/userImages/default.jpg";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Path> paths;


    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public String getActualUsername() {
        return this.username;
    }

    public void setActualUsername(String username) {
        this.username = username;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

}
