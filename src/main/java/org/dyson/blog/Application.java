package org.dyson.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.cassandra.config.EnableReactiveCassandraAuditing;

@SpringBootApplication
@EnableReactiveCassandraAuditing
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
