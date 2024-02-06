package org.dyson.blog.repository;

import org.dyson.blog.entity.Post;
import org.dyson.blog.entity.PostKeys;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ReactivePostRepository extends ReactiveCassandraRepository<Post, PostKeys> {

    @Query("select * from post")
    Flux<Post> findAll(Pageable pageable);

    Mono<Post> findByKeys_Id(UUID id);

    Mono<Void> deleteByKeys_Id(UUID postId);
}
