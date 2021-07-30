import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { json } from "express";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {

    }
    @Post()
    @ApiBody({ description: 'Product json', type: json, required: true })
    async addProducts(@Body('') product: Product) {
        const productId = await this.productsService.addProduct(product.title, product.description, product.price);
        return { id: productId };
    }

    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') productId: string) {
        return await this.productsService.getProductForId(productId);
    }

    @Patch(':id')
    updateProduct(@Param('id') productId: string, @Body('title') title: string, @Body('description') description: string, @Body('price', ParseIntPipe) price: number): any {
        this.productsService.updateProduct(productId, title, description, price);
        return 'success';
    }
}