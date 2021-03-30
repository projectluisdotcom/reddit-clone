import argon2 from 'argon2'
import { IHashGenerator } from '../domain/abstraction/IHashGenerator'

export default class Argon2Adapter implements IHashGenerator {
    async Hash(key: string): Promise<string> {
        return await argon2.hash(key)
    }

    async Verify(key: string, encrypted: string): Promise<boolean> {
        return await argon2.verify(key, encrypted)
    }    
}