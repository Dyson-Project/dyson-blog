package org.dyson.blog;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.draft.DraftRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.cassandra.config.EnableReactiveCassandraAuditing;

@Slf4j
@SpringBootApplication
@RequiredArgsConstructor
@EnableReactiveCassandraAuditing
public class Application implements CommandLineRunner {
    final DraftRepository draftRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        draftRepository.findAll("test", CassandraPageRequest.first(10))
//            .log().blockLast();
    }
}
