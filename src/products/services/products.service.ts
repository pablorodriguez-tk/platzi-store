import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

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
      image: 'https://exampe.com',
    },
  ];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.filter((product) => product.id === id);
    if (product.length === 0)
      throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = { id: this.counterId, ...payload };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
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
