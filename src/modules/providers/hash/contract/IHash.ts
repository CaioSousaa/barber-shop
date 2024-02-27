export interface IHash {
  generateHash(payload: string): Promise<string>;
}
