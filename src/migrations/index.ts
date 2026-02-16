import * as migration_20260216_001456 from './20260216_001456';
import * as migration_20260216_114322 from './20260216_114322';

export const migrations = [
  {
    up: migration_20260216_001456.up,
    down: migration_20260216_001456.down,
    name: '20260216_001456',
  },
  {
    up: migration_20260216_114322.up,
    down: migration_20260216_114322.down,
    name: '20260216_114322'
  },
];
