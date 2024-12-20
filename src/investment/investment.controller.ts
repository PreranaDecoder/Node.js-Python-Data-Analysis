import { Controller, Get } from "@nestjs/common";
import { InvestmentService } from "./investment.service";

@Controller("api/investments") // Base route
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get("/pass") // /api/investments/pass
  getValidInvestments() {
    return this.investmentService.getValidInvestments();
  }

  @Get("/violate") // /api/investments/violate
  getInvalidInvestments() {
    return this.investmentService.getInvalidInvestments();
  }
}
