package org.dyson.blog;

import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.cassandra.config.EnableReactiveCassandraAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.reactive.config.EnableWebFlux;

@SpringBootApplication
@EnableReactiveCassandraAuditing
public class DysonBlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(DysonBlogApplication.class, args);
    }

}
