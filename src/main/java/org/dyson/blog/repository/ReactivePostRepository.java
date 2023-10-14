package org.dyson.blog.repository;

import org.dyson.blog.entity.Post;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ReactivePostRepository extends ReactiveCassandraRepository<Post, UUID> {
    @Query("select * from post")
    Flux<Post> findAll(Pageable pageable);
}
