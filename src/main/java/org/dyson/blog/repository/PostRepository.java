package org.dyson.blog.repository;

import org.dyson.blog.entity.Post;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface PostRepository extends CassandraRepository<Post, UUID> {
//    @Query("select * from post")
//    Mono<Slice<Post>> findAll(CassandraPageRequest pageable);
}
