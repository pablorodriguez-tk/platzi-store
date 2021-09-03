import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'blabla',
      price: 122,
      stock: 12,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId += 1;
    const newProduct = { id: this.counterId, ...payload };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: Product) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        const updatedProduct: Product = {
          ...product,
          ...payload,
        };
        return updatedProduct;
      }
      return product;
    });
  }

  delete(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    return { deleted: id };
  }
}
