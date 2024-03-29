import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepo: typeof Post,
        private filesService: FilesService
        ) {}

    async create(dto: CreatePostDto, image: any): Promise<Post> {
        const imagePath = await this.filesService.createFile(image);
        const post = await this.postRepo.create({ ...dto, image: imagePath });
        return post;
    }
}
