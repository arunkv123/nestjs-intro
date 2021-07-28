import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {

    }
    @Post()
    addProducts(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number): any {
        const productId = this.productsService.addProduct(title, description, price);
        return { id: productId };
    }

    @Get()
    getAllProducts(): any {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string): any {
        return this.productsService.getProductForId(productId);
    }

    @Patch(':id')
    updateProduct(@Param('id') productId: string, @Body('title') title: string, @Body('description') description: string, @Body('price') price: number): any {
        this.productsService.updateProduct(productId, title, description, price);
        return 'success';
    }
}