package org.dyson.blog.draft

import java.time.Instant

data class CreateDraftRequest(
    val title: String?,
    val content: String?
)

data class UpdateDraftRequest(
    val title: String?,
    val content: String?
)

data class DraftDto(
    val draftId: String,
    val title: String?,
    val content: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(d: Draft) : this(
        draftId = d.keys.postId,
        title = d.title,
        content = d.content,
        createdDate = d.keys.createdDate,
        lastModifiedDate = d.lastModifiedDate,
        createdBy = d.createdBy
    )
}