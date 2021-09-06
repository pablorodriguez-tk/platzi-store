import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.customerRepo.find();
  }

  async findById(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    this.customerRepo.merge(customer, payload);
    return this.customerRepo.save(customer);
  }

  async delete(id: number) {
    return await this.customerRepo.delete(id);
  }
}
