package org.dyson.blog.post;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface PostRepository extends CassandraRepository<Post, String> {
//    @Query("select * from post")
//    Mono<Slice<Post>> findAll(CassandraPageRequest pageable);
}
