import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateProductDto } from '../products/dto/create-product.dto';

@Entity({ name: 'products' })
export class Product {
  constructor(product: CreateProductDto) {
    this.name = product?.name;
    this.brand = product?.brand;
    this.price = product?.price;
    this.amount = product?.amount;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  price: number;

  @Column()
  amount: number;
}
