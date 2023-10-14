package org.dyson.blog;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.dto.PostDto;
import org.dyson.blog.entity.Post;
import org.dyson.blog.entity.PostType;
import org.dyson.blog.repository.PostRepository;
import org.dyson.blog.repository.ReactivePostRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Optional;
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
    Slice<Post> list(@ParameterObject Pageable pageable) {
        var page = CassandraPageRequest.of(
            pageable,
            null
//            pagingState.map(PagingState::fromString)
//                .map(PagingState::getRawPagingState)
//                .orElse(null)
        );
        log.debug("-----> {}",pageable.getPageSize());
        return repository.findAll(CassandraPageRequest.first(1));
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public void create(@RequestBody PostDto body) {
        reactiveRepository.insert(new Post(
            body.getCategoryId(),
            PostType.POST,
            body.getTitle(),
            null,
            body.getContent()
        )).block();
    }

    @GetMapping("/{postId}")
    Mono<Post> get(@PathVariable UUID postId) {
        var post = reactiveRepository.findById(postId);
        return post;
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable UUID postId) {
        reactiveRepository.deleteById(postId).block();
    }
}
