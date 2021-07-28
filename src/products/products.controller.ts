import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {

    }
    @Post()
    async addProducts(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
        const productId = await this.productsService.addProduct(title, description, price);
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
    updateProduct(@Param('id') productId: string, @Body('title') title: string, @Body('description') description: string, @Body('price') price: number): any {
        this.productsService.updateProduct(productId, title, description, price);
        return 'success';
    }
}