export interface Draft {
    postId: string,
    title: string,
    content: string
    createdDate: string,
    lastModifiedDate: string,
    createdBy: string
}

export interface DraftSummary {
    id: string,
    title: string,
    lastModifiedDate: string
}
