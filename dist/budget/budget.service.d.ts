import { Repository } from 'typeorm';
import { Budget } from './budget.entity';
export declare class BudgetService {
    private readonly budgetRepository;
    constructor(budgetRepository: Repository<Budget>);
    getAllBudgets(): Promise<Budget[]>;
}
