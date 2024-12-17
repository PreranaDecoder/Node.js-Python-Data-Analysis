import { Controller, Get } from '@nestjs/common';
import { BudgetService } from './budget.service';

@Controller('api/budget-rules')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  getAllBudgetRules() {
    return this.budgetService.getAllBudgets();
  }
}
