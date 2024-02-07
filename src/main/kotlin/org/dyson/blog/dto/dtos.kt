package org.dyson.blog.dto

import org.dyson.blog.entity.Draft
import org.dyson.blog.entity.Post
import org.springframework.beans.factory.annotation.Value
import java.time.Instant
import java.util.*

data class CreatePostRequest(
    val categoryId: String?,
    val title: String,
    val content: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
)

data class CreateDraftRequest(
    val title: String?,
    val content: String?
)

data class DraftDto(
    val postId: String,
    val title: String?,
    val content: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(d: Draft) : this(
        postId = d.keys.postId,
        title = d.title,
        content = d.content,
        createdDate = d.keys.createdDate,
        lastModifiedDate = d.lastModifiedDate,
        createdBy = d.createdBy
    )
}

data class PostDto(
    val postId: String,
    val categoryId: String?,
    val title: String,
    val content: String?,
    val createdDate: Instant?,
    val lastModifiedDate: Instant?,
    val createdBy: String?,
) {
    constructor(p: Post) : this(
        postId = p.keys.postId,
        title = p.title,
        categoryId = p.categoryId,
        content = p.content,
        createdDate = p.keys.createdDate,
        lastModifiedDate = p.lastModifiedDate,
        createdBy = p.createdBy
    )
}

interface PostSummaryDto {
    @get:Value("#{target.keys.postId}")
    val id: UUID?
    val title: String?
    val lastModifiedDate: Instant?
}