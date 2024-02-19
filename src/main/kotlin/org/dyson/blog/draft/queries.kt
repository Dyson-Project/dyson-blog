package org.dyson.blog.draft

import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.PathVariable

class GetDraftsQuery : PageRequest(0, 20, Sort.unsorted())

class GetDraftQuery(
    @PathVariable
    val id: String
)