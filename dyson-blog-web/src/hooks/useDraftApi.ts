import {useAuthApi} from "@/hooks/useAuthApi";
import {AxiosResponse} from "axios";
import {Draft, DraftSummary} from "@/types/draft";
import {useAuth} from "@/hooks/useAuth";
import {Pageable} from "@/types/api";

export interface CreateDraftRequest {
    postId?: string;
    titleEditorState?: string;
    contentEditorState?: string;
}

export interface UpdateDraftRequest {
    titleEditorState?: string;
    contentEditorState?: string;
}

export const useDraftApi = () => {
    const {user, token} = useAuth();
    const {bearerTokenAxios} = useAuthApi({baseURL: process.env.NEXT_PUBLIC_API_HOST});

    const getDrafts = (pageable: Pageable): Promise<AxiosResponse<DraftSummary[]>> => {
        return bearerTokenAxios(token)
            .get(`/api/v1/drafts`);
    }
    const getDraft = (id: string): Promise<AxiosResponse<Draft>> => {
        return bearerTokenAxios(token)
            .get(`/api/v1/drafts/${id}`);
    }
    const createDraft = (draft: CreateDraftRequest): Promise<AxiosResponse<String>> => {
        return bearerTokenAxios(token)
            .post(`/api/v1/drafts`, draft);
    }
    const updateDraft = (id: string, body: UpdateDraftRequest): Promise<AxiosResponse<void>> => {
        return bearerTokenAxios(token)
            .put(`/api/v1/drafts/${id}`, body);
    }
    const deleteDraft = (id: string): Promise<AxiosResponse<void>> => {
        return bearerTokenAxios(token)
            .delete(`/api/v1/drafts/${id}`);
    }
    return {getDrafts, getDraft, createDraft, updateDraft, deleteDraft}
}