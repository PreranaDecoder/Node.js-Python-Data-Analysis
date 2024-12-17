import { Controller, Get, Query } from '@nestjs/common';
import { InvestmentService } from './investment.service';

@Controller('api/investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  getAllInvestments(@Query('sort') sort: string) {
    const sortByDate = sort === 'date';
    return this.investmentService.getAllInvestments(sortByDate);
  }
}
