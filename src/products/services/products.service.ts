import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepo.find();
  }

  async findById(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    return await this.productRepo.delete(id);
  }
}
