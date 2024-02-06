package org.dyson.blog.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.data.cassandra.config.EnableCassandraAuditing;
import org.springframework.data.cassandra.config.EnableReactiveCassandraAuditing;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.ReactiveAuditorAware;
import reactor.core.publisher.Mono;

import java.util.Optional;

@EnableCassandraAuditing
@EnableReactiveCassandraAuditing
public class AuditorAwareConfig {
    @Bean
    ReactiveAuditorAware<String> reactiveAuditorAware() {
        return () -> Mono.just("the-current-user");
    }

    @Bean
    AuditorAware<String> auditorAware() {
        return () -> Optional.of("current-user");
    }
}
