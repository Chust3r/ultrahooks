import { SequenceHook } from '~hooks/sequence'

export const sequence = <T = unknown>() => new SequenceHook<T>()
