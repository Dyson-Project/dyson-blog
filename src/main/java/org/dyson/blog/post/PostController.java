package org.dyson.blog.post;

import io.netty.handler.codec.http.HttpResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    final PostRepository reactiveRepository;
    final PostService postService;

    @GetMapping
    Flux<PostSummaryDto> list(@ParameterObject Pageable pageable) {
        return Flux.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED));
//        var page = CassandraPageRequest.of(
//            pageable,
//            null
////            pagingState.map(PagingState::fromString)
////                .map(PagingState::getRawPagingState)
////                .orElse(null)
//        );
//        return reactiveRepository.findAll(pageable);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    Mono<String> publishPost(@RequestBody PublishPostRequest request) {
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
