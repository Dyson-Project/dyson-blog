package org.dyson.blog.draft

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.data.annotation.*
import org.springframework.data.cassandra.core.cql.Ordering
import org.springframework.data.cassandra.core.cql.PrimaryKeyType
import org.springframework.data.cassandra.core.mapping.PrimaryKey
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import org.springframework.data.cassandra.core.mapping.Table
import org.springframework.data.domain.Persistable
import java.time.Instant

@Table
data class Draft(
    @PrimaryKey
    val keys: DraftKeys = DraftKeys(),
    var title: String?,
    var content: String?
) : Persistable<DraftKeys> {
    @Version
    var version: Long = 0L

    @CreatedBy
    var createdBy: String? = null

    @LastModifiedBy
    var lastModifiedBy: String? = null

    @LastModifiedDate
    var lastModifiedDate: Instant? = null


    constructor(newTitle: String?, newContent: String?) : this(
        title = newTitle, content = newContent
    )

    override fun getId(): DraftKeys = keys

    override fun isNew(): Boolean = version == 0L

}

@PrimaryKeyClass
data class DraftKeys(
    @PrimaryKeyColumn(ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    val draftId: String = RandomStringUtils.randomAlphanumeric(12),
    @CreatedDate
    @PrimaryKeyColumn(ordinal = 2, ordering = Ordering.DESCENDING)
    var createdDate: Instant? = null,
)