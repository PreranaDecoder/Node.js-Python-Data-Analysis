import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvestmentService } from "./investment.service";
import { InvestmentController } from "./investment.controller";
import { Investment } from "./investment.entity";
import { Budget } from "../budget/budget.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Investment, Budget])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
