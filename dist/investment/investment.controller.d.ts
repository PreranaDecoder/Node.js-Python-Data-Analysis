import { InvestmentService } from "./investment.service";
export declare class InvestmentController {
    private readonly investmentService;
    constructor(investmentService: InvestmentService);
    getValidInvestments(): Promise<import("./investment.entity").Investment[]>;
    getInvalidInvestments(): Promise<import("./investment.entity").Investment[]>;
}
