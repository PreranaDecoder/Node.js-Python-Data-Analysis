"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const typeorm_1 = require("typeorm");
const investment_entity_1 = require("../investment/investment.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [investment_entity_1.Investment],
    synchronize: true,
});
async function seedInvestments() {
    await AppDataSource.initialize();
    console.log('Database Initialized');
    const investmentData = [];
    fs.createReadStream('investments.csv')
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        investmentData.push(row);
    })
        .on('end', async () => {
        for (const row of investmentData) {
            const investment = new investment_entity_1.Investment();
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
//# sourceMappingURL=seed.js.map