package org.dyson.blog.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.security.web.server.util.matcher.PathPatternParserServerWebExchangeMatcher;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity) {
        return httpSecurity
            .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
            .securityMatcher(new PathPatternParserServerWebExchangeMatcher("/api/**"))
            .authorizeExchange((authorize) -> authorize
                .anyExchange().permitAll()
            )
            .oauth2ResourceServer(it -> it.jwt(Customizer.withDefaults()))
            .build();
    }

}
