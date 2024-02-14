package org.dyson.blog.draft;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class DraftService {
    final DraftRepository draftRepository;
    final ObjectMapper objectMapper;

    private String extractValueFromEditorState(String editorState) throws JsonProcessingException {
        return objectMapper.readTree(editorState).get("blocks").get(0).get("text").asText();
    }

    @SneakyThrows
    public Mono<DraftDto> createDraft(CreateDraftRequest request) {
        return draftRepository
            .insert(new Draft(
                DraftKeys.newKeysFromPostId(request.getPostId()),
                new Title(extractValueFromEditorState(request.getTitle()), request.getTitle()),
                request.getContent()
            ))
            .map(DraftDto::new);
    }

    public Flux<DraftSummaryDto> getDrafts(Pageable pageable) {
        return ReactiveSecurityContextHolder.getContext()
            .map(context -> (JwtAuthenticationToken) context.getAuthentication())
            .flatMapMany(authentication -> {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                log.debug("=========> {} {}", authentication.getName(), jwt.getSubject());
                return draftRepository.findAll(pageable);
            });
    }

    public Mono<DraftDto> updateDraft(String id, UpdateDraftRequest request) {
        return ReactiveSecurityContextHolder.getContext()
            .map(context -> (JwtAuthenticationToken) context.getAuthentication())
            .flatMap(authentication -> {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                log.debug("=========> {} {}", authentication.getName(), jwt.getSubject());
                return draftRepository.findByKeys_DraftId(id)
                    .doOnNext(draft -> {
                        String titleValue = null;
                        try {
                            titleValue = extractValueFromEditorState(request.getTitle());
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                        draft.setTitle(new Title(titleValue, request.getTitle()));
                        draft.setContent(request.getContent());
                    })
                    .flatMap(draftRepository::save)
                    .map(DraftDto::new);
            });

    }
}