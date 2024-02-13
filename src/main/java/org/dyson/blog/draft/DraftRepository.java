package org.dyson.blog.draft;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DraftRepository extends ReactiveCassandraRepository<Draft, DraftKeys> {
    @Query("select draftId, title, content as summaryContent, createdDate, lastModifiedDate from draft where createdBy = :createdBy ALLOW FILTERING")
    @AllowFiltering
    Flux<DraftSummaryDto> findAll(String createdBy, Pageable pageable);

    Mono<Draft> findByKeys_DraftId(String id);

    Mono<Void> deleteByKeys_DraftId(String id);
}
