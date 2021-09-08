import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { Repository } from 'typeorm';
import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  async findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return await this.userRepo.find({ relations: ['customer'] });
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne(id, { relations: ['customer'] });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    if (payload.customerId) {
      const customer = await this.customersService.findById(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Order> {
    const user = await this.userRepo.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
