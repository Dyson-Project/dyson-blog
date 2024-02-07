package org.dyson.blog.draft;

import org.dyson.blog.dto.PostSummaryDto;
import org.dyson.blog.entity.Draft;
import org.dyson.blog.entity.DraftKeys;
import org.dyson.blog.entity.Post;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DraftRepository extends ReactiveCassandraRepository<Draft, DraftKeys> {
    @Query("select postId, title, lastModifiedDate from draft")
    Flux<PostSummaryDto> findAll(Pageable pageable);

    Mono<Post> findByKeys_PostId(String id);
    Mono<Void> deleteByKeys_PostId(String id);
}
