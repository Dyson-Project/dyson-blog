package org.dyson.blog.post;

import lombok.RequiredArgsConstructor;
import org.dyson.blog.draft.DraftRepository;
import org.dyson.blog.dto.CreatePostRequest;
import org.dyson.blog.dto.PostDto;
import org.dyson.blog.entity.Post;
import org.dyson.blog.entity.PostType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PostService {
    final ReactivePostRepository postRepository;
    final DraftRepository draftRepository;

    public Mono<PostDto> publishPost(CreatePostRequest request) {
        return postRepository.insert(new Post(
            request.getCategoryId(),
            PostType.POST,
            request.getTitle(),
            null,
            request.getContent()
        )).map(PostDto::new);
    }
}
