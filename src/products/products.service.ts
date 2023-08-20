import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FullProductDto } from './dto/full-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    private products: FullProductDto[] = [
        {
            id: '1',
            title: 'First prod',
            price: 123
        }
    ];

    getAll(): FullProductDto[] {
        return this.products;
    }

    getOne(id: string): FullProductDto {
        return this.products.find(el => el.id === id);
    }

    create(data: CreateProductDto): string {
        const id = Date.now().toString();
        this.products.push({ id, ...data });
        return 'created ' + JSON.stringify(this.products);
    }

    remove(id: string): string {
        const index = this.products.findIndex(el => el.id === id);
        this.products.splice(index, 1);

        return 'removed ' + JSON.stringify(this.products);
    }

    update(id: string, updateProductDto: UpdateProductDto): string {
        this.products.reduce((acc, el) => {
            if(el.id !== id) return acc;
            el.title = updateProductDto.title;
            el.price = updateProductDto.price;
            return acc;
        }, []);

        return 'updated ' + JSON.stringify(this.products);
    }
}
