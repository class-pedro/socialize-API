import { IPostService } from './IPostService';
import { IPostRepository, IUserRepository } from '@/repositories';
import { PostUpdateDTO } from '@/domain/posts/postUpdateDTO';
import { PostCreateDTO } from '@/domain/posts/postCreateDTO';
import { PostDTO, UserDTO } from '../../domain';

export class PostService implements IPostService {
  constructor(
    readonly postsRepository: IPostRepository,
    readonly usersRepository: IUserRepository,
  ) {}

  async createPost(newPost: PostCreateDTO) {
    return await this.postsRepository.createPost(newPost);
  }

  async listPosts() {
    return await this.postsRepository.listPosts();
  }

  async getPostById(postId: string) {
    return await this.postsRepository.getPostById(postId);
  }

  async canContinue(postId: string, username: string) {
    const post = (await this.getPostById(
      postId,
    )) as Partial<PostDTO>;
    const { id: requesterId } = (await this.usersRepository.getUserByUsername(
      username,
    )) as Partial<UserDTO>;

    if (!post) {
      throw new Error('Post não encontrado.');
    }

    if (post.authorId !== requesterId) {
      throw new Error('Você não pode alterar um post que não é seu.');
    }
  }

  async updatePost(
    postId: string,
    updatePost: PostUpdateDTO,
    username: string,
  ) {
    await this.canContinue(postId, username);

    return await this.postsRepository.updatePost(postId, updatePost);
  }

  async deletePost(postId: string, username: string) {
    await this.canContinue(postId, username);

    await this.postsRepository.deletePost(postId);
  }
}
