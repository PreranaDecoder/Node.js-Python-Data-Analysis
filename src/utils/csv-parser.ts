import * as fs from 'fs';
import csv from 'csv-parser';

export async function loadCsv(filePath: string): Promise<any[]> {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv()) // Default import works here
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
