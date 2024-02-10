package org.dyson.blog;

import org.dyson.blog.post.PostController;
import org.dyson.blog.post.PostSummaryDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(PostController.class)
class BlogControllerTest {

    @Autowired
    private MockMvc mvc;
    @MockBean
    private PostController blogController;

    @Test
    void getPosts() throws Exception {
        var pageable = PageRequest.of(0, 20);
        Slice<PostSummaryDto> posts = new PageImpl<>(List.of(), pageable, 0);
        given(blogController.list(pageable))
            .willReturn(posts);
        mvc.perform(get("/api/v1/posts")
                .with(SecurityMockMvcRequestPostProcessors.user("Long")
                    .password("P@ssword789"))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
