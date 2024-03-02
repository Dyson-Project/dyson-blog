package org.dyson.blog.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dyson.blog.draft.DraftByPostRepository;
import org.dyson.blog.draft.DraftRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {
    final PostRepository postRepository;
    final DraftRepository draftRepository;
    final EditorService editorService;
    final DraftByPostRepository draftByPostRepository;

    public Mono<Post> createPost(PublishPostRequest request) {
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
            ));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    public Mono<String> publishPost(PublishPostRequest request) {
        return draftByPostRepository.findByKeys_DraftId(request.getDraftId())
            .map(it -> it.getKeys().getPostId())
            .log();
//            .switchIfEmpty(createPost(request).map(p ->
//                p.getId().getPostId()
//            ).log())
//            .flatMap(postRepository::findByKeys_PostId)
//            .doOnNext(post -> {
//                if (Objects.isNull(post)) {
//                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
//                }
//                try {
//                    log.debug("Do on found post: {}", post);
//                    post.setTitle(new PostTitle(
//                        editorService.extractValueFromEditorState(request.getTitleEditorState()),
//                        request.getTitleEditorState()
//                    ));
//                    post.setContent(new PostContent(
//                        editorService.extractValueFromEditorState(request.getContentEditorState()),
//                        request.getContentEditorState()
//                    ));
//                } catch (JsonProcessingException e) {
//                    throw new RuntimeException(e);
//                }
//            })
//            .map(post -> post.getId().getPostId());
    }
}
