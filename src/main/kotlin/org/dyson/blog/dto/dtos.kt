package org.dyson.blog.dto

data class PostDto(
    val categoryId: String,
    val title: String,
    val content: String,
)