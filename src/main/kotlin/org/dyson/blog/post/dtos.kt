package org.dyson.blog.post

import org.springframework.beans.factory.annotation.Value
import java.time.Instant
import java.util.*

data class PublishPostRequest(
    val draftId: String?,
    val categoryId: String,
    val titleEditorState: String,
    val contentEditorState: String,
)

data class PostDto(
    val id: String,
    val categoryId: String?,
    val title: String,
    val titleEditorState: String,
    val content: String?,
    val contentEditorState: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(p: Post) : this(
        id= p.keys.postId,
        title = p.title.value,
        titleEditorState = p.title.editorState,
        content=p.content.value,
        contentEditorState=p.content.editorState,
        categoryId = p.categoryId,
        createdDate = p.keys.createdDate,
        lastModifiedDate = p.lastModifiedDate,
        createdBy = p.createdBy
    )
}

interface PostSummaryDto {
    @get:Value("#{target.keys.postId}")
    val id: String?
    @get:Value("#{target.title.value}")
    val title: String?
    val lastModifiedDate: Instant?
}