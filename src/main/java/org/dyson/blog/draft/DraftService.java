package org.dyson.blog.draft;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.post.EditorService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class DraftService {
    final DraftRepository draftRepository;
    final EditorService editorService;

    @SneakyThrows
    public Mono<DraftDto> createDraft(CreateDraftRequest request) {
        return draftRepository
            .insert(new Draft(
                new DraftKeys(),
                new DraftTitle(editorService.extractValueFromEditorState(request.getTitleEditorState()), request.getTitleEditorState()),
                new DraftContent(editorService.extractValueFromEditorState(request.getContentEditorState()), request.getContentEditorState())
            ))
            .map(DraftDto::new);
    }


    public Mono<DraftDto> updateDraft(String id, UpdateDraftRequest request) {
        return draftRepository.findByKeys_DraftId(id)
            .doOnNext(draft -> {
                try {
                    draft.setTitle(new DraftTitle(editorService.extractValueFromEditorState(request.getTitleEditorState()), request.getTitleEditorState()));
                    draft.setContent(new DraftContent(editorService.extractValueFromEditorState(request.getContentEditorState()), request.getContentEditorState()));
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            })
            .flatMap(draftRepository::save)
            .map(DraftDto::new);
    }
}