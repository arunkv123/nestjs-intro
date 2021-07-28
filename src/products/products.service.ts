import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    addProduct(title: string, description: string, price: number) {

        const product = new Product(this.generateId().toString(), title, description, price);
        this.products.push(product);
        return product.id;
    }

    private generateId() {
        return this.products.length + 1;
    }

    getAllProducts() {
        return [...this.products];
    }

    getProductForId(productId: string) {
        const product = this.findProduct(productId);
        return { ...product };
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        var product: Product ;
        this.products.forEach((value, key, map) => {
            if (value.id === productId) {
                product = value;
                if (title) {
                    product.title = title;
                }
                if (description) {
                    product.description = description;
                }
                if (price) {
                    product.price = price;
                }
            }
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
    }

    private findProduct(id: string) {
        const product = this.products.find(prod => prod.id === id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}