import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {
        super(productRepository);
    }

}
