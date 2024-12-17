import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './budget/budget.entity';
import { Investment } from './investment/investment.entity';
import { BudgetModule } from './budget/budget.module';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // database: 'database/sqlite.db',
      database: 'database.sqlite', // SQLite file path
      entities: [Budget, Investment],
      synchronize: true, // Auto-create database schema
    }),
    BudgetModule,
    InvestmentModule,
  ],
})
export class AppModule {}
