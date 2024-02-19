package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.config.ProcessingGroup;
import org.axonframework.queryhandling.QueryHandler;
import org.reactivestreams.Publisher;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@ProcessingGroup("draft")
public class DraftProjection {
    final DraftRepository draftRepository;

    @QueryHandler
    public Publisher<DraftSummaryDto> getDrafts(GetDraftsQuery query) {
        return ReactiveSecurityContextHolder.getContext()
            .map(context -> (JwtAuthenticationToken) context.getAuthentication())
            .flatMapMany(authentication ->
                draftRepository.findAll(authentication.getName(), query)
            );
    }

    @QueryHandler
    public Publisher<DraftDto> getDraft(GetDraftQuery query) {
        return ReactiveSecurityContextHolder.getContext()
            .map(context -> (JwtAuthenticationToken) context.getAuthentication())
            .flatMap(authentication -> draftRepository.findByKeys_DraftId(query.getId()))
            .map(DraftDto::new);
    }
}
