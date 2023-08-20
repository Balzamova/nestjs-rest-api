import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
export declare class PostsService {
    private postRepo;
    private filesService;
    constructor(postRepo: typeof Post, filesService: FilesService);
    create(dto: CreatePostDto, image: any): Promise<Post>;
}
