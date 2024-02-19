package org.dyson.blog.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.dyson.blog.draft.DraftRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostService {
    final ReactivePostRepository postRepository;
    final DraftRepository draftRepository;
    final EditorService editorService;

    public Mono<PostDto> publishPost(PublishPostRequest request) {
        if (Objects.isNull(request.getDraftId())) {
            try {
                return postRepository.insert(new Post(
                    request.getCategoryId(),
                    PostType.POST,
                    new PostTitle(
                        editorService.extractValueFromEditorState(request.getContentEditorState()),
                        request.getTitleEditorState()
                    ),
                    null,
                    new PostContent(
                        editorService.extractValueFromEditorState(request.getContentEditorState()),
                        request.getContentEditorState()
                    )
                )).map(PostDto::new);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        return draftRepository.findPostIdByDraftId(request.getDraftId())
            .flatMap(postRepository::findByKeys_PostId)
            .doOnNext((post) -> {
                if (Objects.isNull(post)) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
                try {
                    post.setTitle(new PostTitle(
                        editorService.extractValueFromEditorState(request.getTitleEditorState()),
                        request.getTitleEditorState()
                    ));
                    post.setContent(new PostContent(
                        editorService.extractValueFromEditorState(request.getContentEditorState()),
                        request.getContentEditorState()
                    ));
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            })
//            .cast(PostDto.class);
            .map(PostDto::new);
    }
}
