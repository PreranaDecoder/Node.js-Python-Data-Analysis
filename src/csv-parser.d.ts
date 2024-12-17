import * as csv from 'csv-parser';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

declare module 'csv-parser' {
  import { Readable } from 'stream';

  interface CsvParserOptions {
    separator?: string;
    skipLines?: number;
    headers?: boolean | string[];
  }

  export default function csvParser(
    options?: CsvParserOptions,
  ): NodeJS.ReadWriteStream;
}
