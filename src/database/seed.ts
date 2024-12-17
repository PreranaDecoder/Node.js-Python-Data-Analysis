import * as fs from 'fs';
import csv from 'csv-parser';
import { DataSource } from 'typeorm';
import { Investment } from '../investment/investment.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Investment],
  synchronize: true,
});

async function seedInvestments() {
  await AppDataSource.initialize();
  console.log('Database Initialized');

  const investmentData = [];
  fs.createReadStream('investments.csv')
    .pipe(csv())
    .on('data', (row) => {
      investmentData.push(row);
    })
    .on('end', async () => {
      for (const row of investmentData) {
        const investment = new Investment();
        investment.date = row.Date;
        investment.amount = Number(row.Amount);
        investment.sector = row.Sector;
        await AppDataSource.manager.save(investment);
      }
      console.log('Investment data loaded successfully.');
      process.exit(0);
    });
}

seedInvestments().catch((error) => {
  console.error('Error loading investments:', error);
  process.exit(1);
});
