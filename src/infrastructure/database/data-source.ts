import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { typeOrmConfig } from './typeorm-cli.config';

// Load environment variables from `.env`
config();

// Create a mock ConfigService for standalone usage
const configService = new ConfigService();

export const AppDataSource = new DataSource(typeOrmConfig(configService) as any);


