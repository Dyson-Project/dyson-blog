package org.dyson.blog.draft

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.data.annotation.*
import org.springframework.data.cassandra.core.cql.Ordering.DESCENDING
import org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED
import org.springframework.data.cassandra.core.mapping.*
import org.springframework.data.domain.Persistable
import java.time.Instant


@UserDefinedType("title_type")
data class DraftTitle(
    @CassandraType(type = CassandraType.Name.TEXT)
    val value: String? = null,
    @CassandraType(type = CassandraType.Name.TEXT)
    val editorState: String? = null
)

@UserDefinedType("draft_content_type")
data class DraftContent(
    @CassandraType(type = CassandraType.Name.TEXT)
    val value: String?,
    @CassandraType(type = CassandraType.Name.TEXT)
    val editorState: String?
)

@Table
class Draft(
    @PrimaryKey
    val keys: DraftKeys = DraftKeys(),
    @CassandraType(type = CassandraType.Name.UDT, userTypeName = "title_type")
    var title: DraftTitle,
    @CassandraType(type = CassandraType.Name.UDT, userTypeName = "content_type")
    var content: DraftContent,
) : Persistable<DraftKeys> {
    @Version
    var version: Long = 0L

    var postId: String? = null

    @CreatedBy
    var createdBy: String? = null

    @LastModifiedBy
    var lastModifiedBy: String? = null

    @LastModifiedDate
    var lastModifiedDate: Instant? = null

    override fun getId(): DraftKeys = keys

    override fun isNew(): Boolean = version == 0L
}

@PrimaryKeyClass
data class DraftKeys(
    @PrimaryKeyColumn(ordinal = 0, type = PARTITIONED)
    val draftId: String = RandomStringUtils.randomAlphanumeric(12),
    @CreatedDate
    @PrimaryKeyColumn(ordinal = 1, ordering = DESCENDING)
    var createdDate: Instant? = null,
)

@Table("draft_by_post_id")
class DraftByPostId(
    @PrimaryKey
    val keys: DraftByPostIdKeys
)

@PrimaryKeyClass
data class DraftByPostIdKeys(
    @PrimaryKeyColumn(ordinal = 1, type = PARTITIONED, name = "post_id")
    val postId: String,
    @PrimaryKeyColumn(ordinal = 2, type = PARTITIONED, name = "draft_id")
    val draftId: String,
)