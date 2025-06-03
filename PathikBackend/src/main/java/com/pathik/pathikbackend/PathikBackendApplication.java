package com.pathik.pathikbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.pathik"})
@ComponentScan(basePackages = {"com.pathik"})
@EnableJpaRepositories
public class PathikBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PathikBackendApplication.class, args);
    }

}
