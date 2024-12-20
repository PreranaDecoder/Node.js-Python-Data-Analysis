"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const investment_entity_1 = require("./investment.entity");
const budget_entity_1 = require("../budget/budget.entity");
let InvestmentService = class InvestmentService {
    constructor(investmentRepository, budgetRepository) {
        this.investmentRepository = investmentRepository;
        this.budgetRepository = budgetRepository;
    }
    async getValidInvestments() {
        const investments = await this.investmentRepository.find();
        const budgets = await this.budgetRepository.find();
        return investments.filter((investment) => {
            const budget = budgets.find((b) => b.sector === investment.sector);
            if (!budget)
                return true;
            return investment.amount <= budget.amount;
        });
    }
    async getInvalidInvestments() {
        const investments = await this.investmentRepository.find();
        const budgets = await this.budgetRepository.find();
        console.log("Investments:", investments);
        console.log("Budgets:", budgets);
        return investments.filter((investment) => {
            const budget = budgets.find((b) => b.sector?.trim().toLowerCase() ===
                investment.sector?.trim().toLowerCase());
            if (!budget)
                return false;
            return investment.amount > budget.amount;
        });
    }
};
exports.InvestmentService = InvestmentService;
exports.InvestmentService = InvestmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(investment_entity_1.Investment)),
    __param(1, (0, typeorm_1.InjectRepository)(budget_entity_1.Budget)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InvestmentService);
//# sourceMappingURL=investment.service.js.map