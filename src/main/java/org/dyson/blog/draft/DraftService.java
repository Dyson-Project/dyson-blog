package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Slf4j
@Service
@RequiredArgsConstructor
public class DraftService {
    final DraftRepository draftRepository;

    Flux<DraftSummaryDto> getDrafts(Pageable pageable) {
        return ReactiveSecurityContextHolder.getContext()
            .map(context -> (JwtAuthenticationToken) context.getAuthentication())
            .flatMapMany(authentication -> {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                log.debug("=========> {} {}", authentication.getName(), jwt.getSubject());
                return draftRepository.findAll(authentication.getName(), pageable);
            });
    }
}
