package org.dyson.blog.draft

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.data.annotation.*
import org.springframework.data.cassandra.core.cql.Ordering.DESCENDING
import org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED
import org.springframework.data.cassandra.core.mapping.*
import org.springframework.data.domain.Persistable
import java.time.Instant


@UserDefinedType("title_type")
data class Title(
    @CassandraType(type = CassandraType.Name.TEXT)
    val value: String? = null,
    @CassandraType(type = CassandraType.Name.TEXT)
    val editorState: String? = null
)

@Table
class Draft(
    @PrimaryKey
    val keys: DraftKeys = DraftKeys(),

    @CassandraType(type = CassandraType.Name.UDT, userTypeName = "address_type")
    var title: Title,

    var content: String?,
) : Persistable<DraftKeys> {
    @Version
    var version: Long = 0L

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
    @PrimaryKeyColumn(ordinal = 2, type = PARTITIONED)
    val postId: String? = null
) {
    companion object {
        @JvmStatic
        fun newKeysFromPostId(postId: String?): DraftKeys {
            return DraftKeys(postId = postId)
        }
    }
}