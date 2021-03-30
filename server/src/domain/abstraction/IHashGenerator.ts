export interface IHashGenerator {
    Hash(key: string): Promise<string>
    Verify(key: string, encrypted: string): Promise<boolean>
}
