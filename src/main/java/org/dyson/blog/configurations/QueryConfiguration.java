package org.dyson.blog.configurations;

import org.axonframework.extensions.reactor.queryhandling.gateway.ReactorQueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryConfiguration {
    @Autowired
    void reactiveQueryGatewayConfiguration(ReactorQueryGateway reactorQueryGateway) {
    }
}
