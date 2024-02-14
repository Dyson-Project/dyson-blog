package org.dyson.blog.post;

import lombok.RequiredArgsConstructor;
import org.dyson.blog.draft.DraftRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PostService {
    final ReactivePostRepository postRepository;
    final DraftRepository draftRepository;

    public Mono<PostDto> publishPost(PublishPostRequest request) {
        draftRepository.findPostIdByDraftId(request.getDraftId())
            .flatMap(postId -> {
                return postRepository.findByKeys_PostId(postId);
            })
            .doOnNext(post -> {
                post.setTitle(request.getTitleEditorState());
                post.setContent(request.getContentEditorState());
            })
        ;
        return postRepository.insert(new Post(
            request.getCategoryId(),
            PostType.POST,
            request.getTitle(),
            null,
            request.getContent()
        )).map(PostDto::new);
    }
}
