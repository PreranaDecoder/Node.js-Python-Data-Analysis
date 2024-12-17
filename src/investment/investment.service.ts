import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  getAllInvestments(sortByDate?: boolean): Promise<Investment[]> {
    if (sortByDate) {
      return this.investmentRepository.find({ order: { date: 'ASC' } });
    }
    return this.investmentRepository.find();
  }
}
