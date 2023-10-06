package org.dyson.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Post {
    @PrimaryKeyColumn(ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    UUID id = UUID.randomUUID();
    String categoryId;
    PostType type;
    String title;
    Integer point = 0;
    String url;
    String content;
    @PrimaryKeyColumn(ordinal = 2, ordering = Ordering.DESCENDING)
    Instant createdDate = Instant.now();
    @CreatedBy
    String createdBy;

    public Post(String categoryId, PostType type, String title, String url, String content) {
        this.categoryId = categoryId;
        this.type = type;
        this.title = title;
        this.url = url;
        this.content = content;
    }
}
