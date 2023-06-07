import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(productId: number): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      return undefined;
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    return await this.productsRepository.save(product);
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    const relationExist = await this.productsRepository.exist({
      where: { id: productId },
    });
    if (!relationExist) {
      return 1;
    }
    return await this.productsRepository.update(productId, updateProductDto);
  }

  async remove(productId: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      return 1;
    }
    return await this.productsRepository.remove(product);
  }
}
