import { ListPostsResponse } from '@/domain/posts/listPostsResponse';
import { PostCreateDTO } from '@/domain/posts/postCreateDTO';
import { PostUpdateDTO } from '@/domain/posts/postUpdateDTO';
import { PostDTO } from '../../domain';

export interface IPostService {
  createPost: (req: PostCreateDTO) => Promise<Partial<PostDTO>>;
  listPosts: () => Promise<ListPostsResponse[]>;
  getPostById: (postId: string) => Promise<Partial<PostDTO> | null>;
  canContinue: (postId: string, username: string) => Promise<void>
  updatePost: (postId: string, updatePost: PostUpdateDTO, username: string) => Promise<Partial<PostDTO>>;
  deletePost: (postId: string, username: string) => Promise<void>;
}
