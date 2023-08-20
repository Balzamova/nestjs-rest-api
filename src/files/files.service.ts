import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');

            if(!fs.existsSync(filePath)) {
                await fs.promises.mkdir(filePath, { recursive: true });
            }
            fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
                    if(err) throw new HttpException('Errror while file saving', HttpStatus.INTERNAL_SERVER_ERROR);
                    console.log('Image saved');
            });

            return fileName;
        } catch(e) {
            throw new HttpException('Errror while file saving', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
