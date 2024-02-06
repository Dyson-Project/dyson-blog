package org.dyson.blog;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.dto.CreatePostRequest;
import org.dyson.blog.dto.PostDto;
import org.dyson.blog.dto.PostSummaryDto;
import org.dyson.blog.entity.Post;
import org.dyson.blog.entity.PostType;
import org.dyson.blog.repository.PostRepository;
import org.dyson.blog.repository.ReactivePostRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class BlogController {
    private final PostRepository repository;
    private final ReactivePostRepository reactiveRepository;

    @GetMapping
    Slice<PostSummaryDto> list(@ParameterObject Pageable pageable) {
        log.debug("-----> {}", pageable.getPageSize());
        return repository.findAll(CassandraPageRequest.first(1))
            .map(p -> null);
    }

    @GetMapping("/reactive")
    Flux<PostSummaryDto> listReactive(@ParameterObject Pageable pageable) {
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
        return reactiveRepository.insert(new Post(
            request.getCategoryId(),
            PostType.POST,
            request.getTitle(),
            null,
            request.getContent()
        )).map(PostDto::new);
    }

    @GetMapping("/{postId}")
    Mono<PostDto> get(@PathVariable UUID postId) {
        return reactiveRepository.findByKeys_PostId(postId)
            .map(PostDto::new);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> delete(@PathVariable UUID postId) {
        return reactiveRepository.deleteByKeys_PostId(postId);
    }
}
