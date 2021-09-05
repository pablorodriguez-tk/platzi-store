import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dtos';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand A',
      image: 'http://www.example.com/',
    },
  ];

  findAll() {
    return this.brands;
  }

  findById(id: number) {
    const brand = this.brands.filter((item) => item.id === id);
    if (brand.length === 0)
      throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = { id: this.counterId, ...payload };
    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) return { ...brand, ...payload };
      else return brand;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const brandFinded = this.findById(id);
    if (brandFinded)
      this.brands = this.brands.filter((brand: Brand) => brand.id !== id);

    return brandFinded;
  }
}
