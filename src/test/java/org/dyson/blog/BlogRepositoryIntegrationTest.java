package org.dyson.blog;

import org.dyson.blog.entity.Post;
import org.dyson.blog.repository.PostRepository;
import org.dyson.blog.repository.ReactivePostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@SpringBootTest
public class BlogRepositoryIntegrationTest {

    @Autowired
    private PostRepository blogRepository;
    @Autowired
    private ReactivePostRepository reactiveBlogRepository;

    static List<Post> posts = List.of(new Post());

    @BeforeEach
    public void setUp() {
        // given
//        reactiveBlogRepository.insert(new Post()).block();
    }

    @Test
    public void whenFindAll_thenReturnAll() {
        // when
        var posts = blogRepository.findAll();
        posts.forEach(System.out::println);
    }

    @Test
    public void whenFindAllWithPageable_thenReturnAll() {
        var posts = blogRepository.findAll(PageRequest.of(0, 20));
        posts.forEach(System.out::println);
    }

    @Test
    public void whenFindAllWithPageableReactive_thenReturnAll() {
        var posts = reactiveBlogRepository.findAll()
            .subscribe(System.out::println);
    }
}
