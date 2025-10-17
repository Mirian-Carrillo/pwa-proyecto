// src/db.d.ts
export function saveOfflineData(entry: any): Promise<void>;
export function syncOfflineData(): Promise<void>;
export function sendToFirestore(entry: any): Promise<void>;
