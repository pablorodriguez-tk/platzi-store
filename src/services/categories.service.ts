import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dtos';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category A',
    },
  ];

  findAll() {
    return this.categories;
  }

  findById(id: number) {
    const category = this.categories.filter((item) => item.id === id);
    if (category.length === 0)
      throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = { id: this.counterId, ...payload };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    this.categories = this.categories.map((category) => {
      if (category.id === id) return { ...category, ...payload };
      else return category;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const categoryFinded = this.findById(id);
    if (categoryFinded)
      this.categories = this.categories.filter(
        (category: Category) => category.id !== id,
      );

    return categoryFinded;
  }
}
