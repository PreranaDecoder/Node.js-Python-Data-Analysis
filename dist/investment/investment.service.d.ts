import { Repository } from "typeorm";
import { Investment } from "./investment.entity";
import { Budget } from "../budget/budget.entity";
export declare class InvestmentService {
    private readonly investmentRepository;
    private readonly budgetRepository;
    constructor(investmentRepository: Repository<Investment>, budgetRepository: Repository<Budget>);
    getValidInvestments(): Promise<Investment[]>;
    getInvalidInvestments(): Promise<Investment[]>;
}
