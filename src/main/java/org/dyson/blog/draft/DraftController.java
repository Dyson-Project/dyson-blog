package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.extensions.reactor.queryhandling.gateway.ReactorQueryGateway;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpStatus.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/drafts")
@RequiredArgsConstructor
public class DraftController {
    final DraftService draftService;
    final DraftRepository draftRepository;
    final ReactorQueryGateway reactorQueryGateway;

    @GetMapping
    Flux<DraftSummaryDto> list(@ParameterObject GetDraftsQuery query) {
        return reactorQueryGateway.streamingQuery(query, DraftSummaryDto.class);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    Mono<DraftDto> create(@RequestBody CreateDraftRequest request) {
        return draftService.createDraft(request);
    }

    @PutMapping("/{id}")
    @ResponseStatus(OK)
    Mono<DraftDto> update(@PathVariable String id, @RequestBody UpdateDraftRequest request) {
        return draftService.updateDraft(id, request);
    }

    @GetMapping("/{id}")
    Mono<DraftDto> get(@ParameterObject GetDraftQuery query) {
        return reactorQueryGateway.streamingQuery(query, DraftDto.class).next();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> delete(@PathVariable String id) {
        return draftRepository.deleteByKeys_DraftId(id);
    }
}
