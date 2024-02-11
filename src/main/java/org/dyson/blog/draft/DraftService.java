package org.dyson.blog.draft;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Slf4j
@Service
@RequiredArgsConstructor
public class DraftService {
    final DraftRepository draftRepository;

    Flux<DraftSummaryDto> getDrafts(Pageable pageable) {
        return draftRepository.findAll(pageable, "tranphanthanhlong18@gmail.com");
    }
}
