package org.dyson.blog.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.dto.CreateDraftRequest;
import org.dyson.blog.dto.CreatePostRequest;
import org.dyson.blog.dto.PostDto;
import org.dyson.blog.dto.PostSummaryDto;
import org.dyson.blog.entity.Draft;
import org.dyson.blog.entity.Post;
import org.dyson.blog.entity.PostType;
import org.dyson.blog.draft.DraftRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.dyson.blog.dto.DraftDto;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    final PostRepository repository;
    final ReactivePostRepository reactiveRepository;
    final PostService postService;

    @GetMapping
    Slice<PostSummaryDto> list(@ParameterObject Pageable pageable) {
        log.debug("-----> {}", pageable.getPageSize());
        return repository.findAll(CassandraPageRequest.first(1))
            .map(p -> null);
    }

    @GetMapping("/reactive")
    Flux<PostSummaryDto> listReactive(@RequestParam Boolean isDraft,
                                      @ParameterObject Pageable pageable) {
        var page = CassandraPageRequest.of(
            pageable,
            null
//            pagingState.map(PagingState::fromString)
//                .map(PagingState::getRawPagingState)
//                .orElse(null)
        );
            return reactiveRepository.findAll(pageable);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public Mono<PostDto> create(@RequestBody CreatePostRequest request) {
        return postService.publishPost(request);
    }

    @GetMapping("/{postId}")
    Mono<PostDto> get(@PathVariable String postId) {
        return reactiveRepository.findByKeys_PostId(postId)
            .map(PostDto::new);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> delete(@PathVariable String postId) {
        return reactiveRepository.deleteByKeys_PostId(postId);
    }
}
