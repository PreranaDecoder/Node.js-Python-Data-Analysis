import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Investment } from "./investment.entity";
import { Budget } from "../budget/budget.entity";

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,

    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>
  ) {}

  async getValidInvestments(): Promise<Investment[]> {
    const investments = await this.investmentRepository.find();
    const budgets = await this.budgetRepository.find();

    return investments.filter((investment) => {
      const budget = budgets.find((b) => b.sector === investment.sector);
      if (!budget) return true; // No budget rule, valid by default
      return investment.amount <= budget.amount; // Passes the rule
    });
  }

  async getInvalidInvestments(): Promise<Investment[]> {
    const investments = await this.investmentRepository.find();
    const budgets = await this.budgetRepository.find();

    console.log("Investments:", investments);
    console.log("Budgets:", budgets);

    return investments.filter((investment) => {
      const budget = budgets.find(
        (b) =>
          b.sector?.trim().toLowerCase() ===
          investment.sector?.trim().toLowerCase()
      );
      if (!budget) return false; // No matching budget rule
      return investment.amount > budget.amount; // Violates the rule
    });
  }
}
