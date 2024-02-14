export interface Draft {
    id: string,
    title: string,
    titleEditorState: string,
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
