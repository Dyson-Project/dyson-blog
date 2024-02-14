package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
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

    @GetMapping
    Flux<DraftSummaryDto> list(@ParameterObject Pageable pageable) {
        return draftService.getDrafts(pageable);
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
    Mono<DraftDto> get(@PathVariable String id) {
        return draftRepository.findByKeys_DraftId(id)
            .map(DraftDto::new);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> delete(@PathVariable String id) {
        return draftRepository.deleteByKeys_DraftId(id);
    }
}
