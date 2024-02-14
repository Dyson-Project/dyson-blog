package org.dyson.blog.draft

import org.springframework.beans.factory.annotation.Value
import java.time.Instant

data class CreateDraftRequest(
    val title: String?,
    val postId: String?,
    val content: String?
)

data class UpdateDraftRequest(
    val title: String?,
    val content: String?
)

interface DraftSummaryDto {
    @get:Value("#{target.keys.draftId}")
    val id: String?

    @get:Value("#{target.keys.postId}")
    val postId: String?

    @get:Value("#{target.title.value}")
    val title: String?

    @get:Value("#{target.content.substring(100)}")
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
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(d: Draft) : this(
        draftId = d.keys.draftId,
        postId = d.keys.postId,
        title = d.title.value,
        titleEditorState = d.title.editorState,
        content = d.content,
        createdDate = d.keys.createdDate,
        lastModifiedDate = d.lastModifiedDate,
        createdBy = d.createdBy
    )
}