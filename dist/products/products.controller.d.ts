import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { FullProductDto } from './dto/full-product.dto';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    getAll(): any[];
    getOne(id: string): FullProductDto;
    create(createProductDto: CreateProductDto): string;
    remove(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
}
