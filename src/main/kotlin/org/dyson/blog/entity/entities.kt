package org.dyson.blog.entity

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.cassandra.core.cql.Ordering.DESCENDING
import org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED
import org.springframework.data.cassandra.core.mapping.PrimaryKey
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import java.net.URL
import java.time.Instant
import java.util.*

data class CommentByPost(
    @PrimaryKey
    val blogId: UUID,
    val content: String,
    val reply: List<CommentByPost>
) {
    @PrimaryKeyColumn(ordering = DESCENDING)
    val time: Instant = Instant.now()

    @CreatedBy
    var createdBy: String? = null;
}

enum class PostType {
    LINK, POST
}


data class Post(
    @PrimaryKeyColumn(ordinal = 0, type = PARTITIONED)
    val id: UUID = UUID.randomUUID(),
    val categoryId: String,
    val type: PostType,
    val title: String,
    val point: Int = 0,
    val url: URL?,
    val content: String
) {
    @PrimaryKeyColumn(ordinal = 2, ordering = DESCENDING)
    var time: Instant = Instant.now();

    @CreatedBy
    var createdBy: String? = null;

    constructor(
        category: String,
        type: PostType,
        title: String,
        url: URL?,
        content: String
    ) : this(
        categoryId = category,
        type = type,
        title = title,
        url = url,
        content = content,
    )
}