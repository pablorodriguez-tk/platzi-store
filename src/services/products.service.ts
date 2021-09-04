import { Injectable, NotFoundException } from '@nestjs/common';
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

  findById(id: number) {
    const products = this.products.filter((product) => product.id === id);
    if (products.length === 0)
      throw new NotFoundException(`Product #${id} not found`);
    return products;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = { id: this.counterId, ...payload };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: any) {
    this.products = this.products.map((product) => {
      if (product.id === id) return { ...product, ...payload };
      else return product;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const productFinded = this.findById(id);
    if (productFinded)
      this.products = this.products.filter(
        (product: Product) => product.id !== id,
      );

    return productFinded;
  }
}
