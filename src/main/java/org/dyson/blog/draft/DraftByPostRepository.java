package org.dyson.blog.draft;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import reactor.core.publisher.Mono;

public interface DraftByPostRepository extends ReactiveCassandraRepository<DraftByPostId, DraftByPostIdKeys> {
    @AllowFiltering
    Mono<DraftByPostId> findByKeys_DraftId(String id);
}
