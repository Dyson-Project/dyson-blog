export interface Post {
    id: string,
    title: string,
    titleEditorState: string,
    content: string
    contentEditorState: string
    createdDate: Date
    lastModifiedDate: Date
    createdBy: string
}

export interface PostSummary {
    id: string,
    title: string,
    lastModifiedDate: string
}
