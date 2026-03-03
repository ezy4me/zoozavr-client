import Dexie, { type Table } from 'dexie';

export interface OfflineProgress {
  id?: number;
  userId: number;
  materialId: number;
  is_completed: boolean;
  completed_at: string;
  pendingSync: number; // 0 = синхронизировано, 1 = ожидает
}

export class ZoozavrDB extends Dexie {
  user_material_progress!: Table<OfflineProgress>;

  constructor() {
    super('ZoozavrDB');
    this.version(1).stores({
      user_material_progress: '++id, materialId, pendingSync'
    });
  }
}

export const db = new ZoozavrDB();