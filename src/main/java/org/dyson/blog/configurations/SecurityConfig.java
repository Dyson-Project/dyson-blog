package org.dyson.blog.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity) {
        // @formatter:off
        httpSecurity
            .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
            .authorizeExchange((authorize) -> authorize
                .anyExchange().authenticated()
            );
        // @formatter:on
        return httpSecurity.build();
    }


}
