import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { title } from "process";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

    }
    private products: Product[] = [];
    async addProduct(title: string, description: string, price: number) {

        const product = new this.productModel({ title, description, price });
        const result = await product.save();
        return result.id as string;
    }

    private generateId() {
        return this.products.length + 1;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({ id: prod.id, title: prod.title, description: prod.description, price: prod.price }));

    }

    async getProductForId(productId: string) {
        const product = await this.findProduct(productId);
        return { id: product.id, title: product.title, description: product.description, price: product.price };
    }

    async updateProduct(productId: string, title: string, description: string, price: number) {
        const product = await this.findProduct(productId);
        if (title) {
            product.title = title;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }
        product.save();
        if (!product) {
            throw new NotFoundException('Product not found');
        }
    }

    private async findProduct(id: string) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}