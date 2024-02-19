import {useAuthApi} from "@/hooks/useAuthApi";
import {AxiosResponse} from "axios";
import {Post, PostSummary} from "@/types/post";
import {useAuth} from "@/hooks/useAuth";
import {Pageable} from "@/types/api";

export interface CreatePostRequest {
    draftId?: string,
    categoryId: string,
    titleEditorState: string,
    contentEditorState: string
}

export const usePostApi = () => {
    const {user} = useAuth();
    const {bearerTokenAxios} = useAuthApi({baseURL: process.env.NEXT_PUBLIC_API_HOST});

    const getPosts = (pageable: Pageable): Promise<AxiosResponse<PostSummary[]>> => {
        return bearerTokenAxios(user?.authToken!)
            .get(`/api/v1/posts`);
    }
    const getPost = (id: string): Promise<AxiosResponse<Post>> => {
        return bearerTokenAxios(user?.authToken!)
            .get(`/api/v1/posts/${id}`);
    }
    const publishPost = (post: CreatePostRequest): Promise<AxiosResponse<Post>> => {
        return bearerTokenAxios(user?.authToken!)
            .post(`/api/v1/posts`, post);
    }
    const deletePost = (id: string): Promise<AxiosResponse<void>> => {
        return bearerTokenAxios(user?.authToken!)
            .delete(`/api/v1/posts/${id}`);
    }
    return {getPosts, publishPost, deletePost}
}