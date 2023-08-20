import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    create(body: CreatePostDto, image: string): Promise<import("./posts.model").Post>;
}
