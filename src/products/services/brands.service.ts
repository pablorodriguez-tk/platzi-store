import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async findAll() {
    return await this.brandRepo.find();
  }

  async findById(id: number) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);
    this.brandRepo.merge(brand, payload);
    return this.brandRepo.save(brand);
  }

  async delete(id: number) {
    return await this.brandRepo.delete(id);
  }
}
