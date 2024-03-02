package org.dyson.blog;

import org.dyson.blog.post.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BlogRepositoryIntegrationTest {

    @Autowired
    private PostRepository reactiveBlogRepository;

    @BeforeEach
    public void setUp() {
        // given
//        reactiveBlogRepository.insert(new Post()).block();
    }

//    @Test
//    public void whenFindAll_thenReturnAll() {
//        // when
//        var posts = blogRepository.findAll();
//        posts.forEach(System.out::println);
//    }
//
//    @Test
//    public void whenFindAllWithPageable_thenReturnAll() {
//        var posts = blogRepository.findAll(PageRequest.of(0, 20));
//        posts.forEach(System.out::println);
//    }
//
    @Test
    public void whenFindAllWithPageableReactive_thenReturnAll() {
        var posts = reactiveBlogRepository.findAll()
            .subscribe(System.out::println);
    }
}
