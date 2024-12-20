import { BudgetService } from './budget.service';
export declare class BudgetController {
    private readonly budgetService;
    constructor(budgetService: BudgetService);
    getAllBudgetRules(): Promise<import("./budget.entity").Budget[]>;
}
