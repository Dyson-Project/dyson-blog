package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.dto.CreateDraftRequest;
import org.dyson.blog.dto.DraftDto;
import org.dyson.blog.dto.PostDto;
import org.dyson.blog.dto.PostSummaryDto;
import org.dyson.blog.entity.Draft;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Slf4j
@RestController
@RequestMapping("/api/v1/drafts")
@RequiredArgsConstructor
public class DraftController {
    final DraftRepository draftRepository;

    @GetMapping
    Flux<PostSummaryDto> list(@ParameterObject Pageable pageable) {
        return draftRepository.findAll(pageable);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    Mono<DraftDto> create(@RequestBody CreateDraftRequest request) {
        return draftRepository
            .insert(new Draft(
                request.getTitle(),
                request.getContent()
            ))
            .map(DraftDto::new);
    }

    @GetMapping("/{postId}")
    Mono<PostDto> get(@PathVariable String postId) {
        return draftRepository.findByKeys_PostId(postId)
            .map(PostDto::new);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> delete(@PathVariable String postId) {
        return draftRepository.deleteByKeys_PostId(postId);
    }
}
