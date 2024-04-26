import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  float,
  json
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Achievement: list({
    access: allowAll,
    fields: {
      achievementID: text({ isIndexed: 'unique' }),
      achievementName: text(),
      rewardID: relationship({ ref: 'Reward', many: false }),
    },
  }),
  Reward: list({
    access: allowAll,
    fields: {
      rewardID: text({ isIndexed: 'unique' }),
      rewardName: text(),
      reward: text(),
    },
  }),
  DailyQuest: list({
    access: allowAll,
    fields: {
      questID: text({ isIndexed: 'unique' }),
      questName: text(),
      rewardID: relationship({ ref: 'Reward', many: false }),
    },
  }),
  Weapon: list({
    access: allowAll,
    fields: {
      weaponID: text({ isIndexed: 'unique' }),
      weaponName: text(),
      attackPower: integer(),
      shootTimeSec: float(),
    },
  }),
  Player: list({
    access: allowAll,
    fields: {
      playerID: text({ isIndexed: 'unique' }),
      playerName: text(),
      wallet: text(),
      platformPoints: integer(),
    },
  }),
  Level: list({
    access: allowAll,
    fields: {
      levelID: text({ isIndexed: 'unique' }),
      levelName: text(),
      scanID: relationship({ ref: 'Scan', many: false }),
      makerID: text(),
      gameObjectsInfo: json(),
    },
  }),
  Scan: list({
    access: allowAll,
    fields: {
      scanID: text({ isIndexed: 'unique' }),
      latitude: float(),
      longitude: float(),
      scan: text(),
    },
  }),
  PowerUp: list({
    access: allowAll,
    fields: {
      powerUpID: text({ isIndexed: 'unique' }),
      powerUpName: text(),
      attackBoost: integer(),
      defenseBoost: integer(),
      healthBoost: integer(),
      durationSec: float(),
    },
  }),

};
