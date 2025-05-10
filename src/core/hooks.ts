import { ConcurrentHook } from "~hooks/concurrent";
import { PipelineHook } from "~hooks/pipeline";
import { RaceHook } from "~hooks/race";
import { SequenceHook } from "~hooks/sequence";

export const sequence = <T = unknown>() => new SequenceHook<T>();

export const concurrent = <T = unknown>() => new ConcurrentHook<T>();

export const pipeline = <T = unknown>() => new PipelineHook<T>();

export const race = <T = unknown>() => new RaceHook<T>();
