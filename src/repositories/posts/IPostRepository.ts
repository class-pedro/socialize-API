import { PostCreateDTO } from '@/domain/posts/postCreateDTO';
import { PostUpdateDTO } from '@/domain/posts/postUpdateDTO';
import { ListPostsResponse } from '@/domain/posts/listPostsResponse';
import { PostDTO } from '../../domain';

export interface IPostRepository {
  createPost: (newPost: PostCreateDTO) => Promise<Partial<PostDTO>>;
  listPosts: () => Promise<ListPostsResponse[]>;
  getPostById: (postId: string) => Promise<Partial<PostDTO> | null>;
  updatePost: (postId: string, updatePost: PostUpdateDTO) => Promise<Partial<PostDTO>>;
  deletePost: (postId: string) => Promise<void>;
}
