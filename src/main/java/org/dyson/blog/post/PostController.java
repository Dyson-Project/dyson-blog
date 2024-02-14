package org.dyson.blog.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    final ReactivePostRepository reactiveRepository;
    final PostService postService;

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
    Mono<PostDto> publishPost(@RequestBody PublishPostRequest request) {
        return postService.publishPost(request);
    }


    @GetMapping("/{postId}")
    Mono<PostDto> get(@PathVariable String postId) {
        return reactiveRepository.findByKeys_PostId(postId)
            .map(PostDto::new);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(NO_CONTENT)
    Mono<Void> delete(@PathVariable String postId) {
        return reactiveRepository.deleteByKeys_PostId(postId);
    }
}
