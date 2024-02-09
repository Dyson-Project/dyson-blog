package org.dyson.blog.entity

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.cassandra.core.cql.Ordering.DESCENDING
import org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED
import org.springframework.data.cassandra.core.mapping.PrimaryKey
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import org.springframework.data.cassandra.core.mapping.Table
import org.springframework.data.domain.Persistable
import java.time.Instant

data class CommentByPost(
    @PrimaryKey
    val blogId: String,
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

@Table
data class Draft(
    @PrimaryKey
    val keys: DraftKeys = DraftKeys(),
    var title: String?,
    var content: String?
) : Persistable<DraftKeys> {
    @CreatedBy
    var createdBy: String? = null;

    @LastModifiedBy
    var lastModifiedBy: String? = null;

    @LastModifiedDate
    var lastModifiedDate: Instant? = null;

    @Transient
    @get:JvmName("new")
    var isNew: Boolean = true;

    constructor(newTitle: String?, newContent: String?) : this(
        title = newTitle, content = newContent
    )

    override fun getId(): DraftKeys = keys

    override fun isNew(): Boolean = isNew
}

@PrimaryKeyClass
data class DraftKeys(
    @PrimaryKeyColumn(ordinal = 0, type = PARTITIONED)
    val postId: String = RandomStringUtils.randomAlphanumeric(12),
    @CreatedDate
    @PrimaryKeyColumn(ordinal = 2, ordering = DESCENDING)
    var createdDate: Instant? = null,
)

enum class PostStatus {
    PUBLISHED, DELETED
}

@Table
data class Post(
    @PrimaryKey
    val keys: PostKeys = PostKeys(),
    var categoryId: String?,
    var type: PostType?,
    var title: String,
    var point: Int = 0,
    var url: String?,
    var content: String?,
    var status: PostStatus = PostStatus.PUBLISHED,
) : Persistable<PostKeys> {

    @CreatedBy
    var createdBy: String? = null;

    @LastModifiedBy
    var lastModifiedBy: String? = null;

    @LastModifiedDate
    var lastModifiedDate: Instant? = null;

    @Transient
    @get:JvmName("new")
    var isNew: Boolean = true;

    constructor(
        category: String,
        type: PostType,
        title: String,
        url: String?,
        content: String
    ) : this(
        categoryId = category,
        type = type,
        title = title,
        url = url,
        content = content,
    )

    override fun getId(): PostKeys = keys

    override fun isNew(): Boolean = isNew

}

@PrimaryKeyClass
data class PostKeys(
    @PrimaryKeyColumn(ordinal = 0, type = PARTITIONED)
    val postId: String = RandomStringUtils.randomAlphanumeric(12),
    @CreatedDate
    @PrimaryKeyColumn(ordinal = 2, ordering = DESCENDING)
    var createdDate: Instant? = null,
)