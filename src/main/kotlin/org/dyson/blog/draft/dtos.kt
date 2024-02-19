package org.dyson.blog.draft

import org.springframework.beans.factory.annotation.Value
import java.time.Instant

data class CreateDraftRequest(
    val postId: String?,
    val titleEditorState: String?,
    val contentEditorState: String?
)

data class UpdateDraftRequest(
    val titleEditorState: String?,
    val contentEditorState: String?
)

interface DraftSummaryDto {
    @get:Value("#{target.keys.draftId}")
    val id: String?

    @get:Value("#{target.postId}")
    val postId: String?

    @get:Value("#{target.title.value}")
    val title: String?

    @get:Value("#{target.content.value.substring(0, T(java.lang.Math).min(100, target.content.value.length()))}")
    val summaryContent: String?

    @get:Value("#{target.keys.createdDate}")
    val createdDate: Instant?
    val lastModifiedDate: Instant?
}

data class DraftDto(
    val draftId: String,
    val postId: String?,
    val title: String?,
    val titleEditorState: String?,
    val content: String?,
    val contentEditorState: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(d: Draft) : this(
        draftId = d.keys.draftId,
        postId = d.postId,
        title = d.title.value,
        titleEditorState = d.title.editorState,
        content = d.content.value,
        contentEditorState = d.content.editorState,
        createdDate = d.keys.createdDate,
        lastModifiedDate = d.lastModifiedDate,
        createdBy = d.createdBy
    )
}