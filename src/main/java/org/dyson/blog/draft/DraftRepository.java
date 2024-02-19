package org.dyson.blog.draft;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DraftRepository extends ReactiveCassandraRepository<Draft, DraftKeys> {
    @Query("select draftId, postId, title, content, createdDate, lastModifiedDate from draft where createdBy = :createdBy ALLOW FILTERING")
    Flux<DraftSummaryDto> findAll(String createdBy, Pageable pageable);

    @Query("select * from draft_by_post_id where post_id = :postId")
    Mono<DraftByPostId> findDraftByPostId(String postId);

    Mono<Draft> findByKeys_DraftId(String id);

    @Query("select postId from draft where draftId = :id")
    Mono<String> findPostIdByDraftId(String id);

    Mono<Void> deleteByKeys_DraftId(String id);
}
