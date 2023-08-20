import { CreateProductDto } from './dto/create-product.dto';
import { FullProductDto } from './dto/full-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private products;
    getAll(): FullProductDto[];
    getOne(id: string): FullProductDto;
    create(data: CreateProductDto): string;
    remove(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
}
