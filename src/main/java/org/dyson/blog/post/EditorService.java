package org.dyson.blog.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EditorService {
    final ObjectMapper objectMapper;

    public String extractValueFromEditorState(String editorState) throws JsonProcessingException {
        return objectMapper.readTree(editorState).get("blocks").get(0).get("text").asText();
    }

}
