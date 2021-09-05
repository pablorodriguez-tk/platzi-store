import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dtos';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Nicolas',
      lastName: 'Molina',
      phone: '3111111212',
    },
  ];

  findAll() {
    return this.customers;
  }

  findById(id: number) {
    const customer = this.customers.filter((item) => item.id === id);
    if (customer.length === 0)
      throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = { id: this.counterId, ...payload };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    this.customers = this.customers.map((customer) => {
      if (customer.id === id) return { ...customer, ...payload };
      else return customer;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const customerFinded = this.findById(id);
    if (customerFinded)
      this.customers = this.customers.filter(
        (customer: Customer) => customer.id !== id,
      );

    return customerFinded;
  }
}
