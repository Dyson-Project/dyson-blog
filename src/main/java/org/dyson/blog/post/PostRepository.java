package org.dyson.blog.post;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ReactivePostRepository extends ReactiveCassandraRepository<Post, PostKeys> {

    @Query("select postId, title, lastModifiedDate from post")
    Flux<PostSummaryDto> findAll(Pageable pageable);

    Mono<Post> findByKeys_PostId(String id);

    Mono<Void> deleteByKeys_PostId(String id);
}
