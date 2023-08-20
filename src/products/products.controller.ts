import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NextFunction, Request, Response } from 'express';
import { ProductsService } from './products.service';
import { FullProductDto } from './dto/full-product.dto';

// const service = new ProductsService();

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    // @Get()
    // @Redirect('https://google.com', 301)
    // getAll(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): string {
    //     res.status(200).send();
    //     return 'getAll';
    // }

    @Get()
    getAll(): any[] {
        return this.service.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): FullProductDto {
        return this.service.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // 201
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): string {
        return this.service.create(createProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return this.service.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): string {
        return this.service.update(id, updateProductDto);
    }
}
