import { config } from '@keystone-6/core';

import { lists } from './schema';

import { withAuth, session } from './auth';

import dotenv from 'dotenv';
dotenv.config();

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || '',
      idField: {kind: 'autoincrement'},
      enableLogging: true
    },
    lists,
    session,
  })
);
