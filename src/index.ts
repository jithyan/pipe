type AnyFunction = (...args: any[]) => any;

type PipeInitalArgs<F extends Array<AnyFunction>> = F extends [
  infer First,
  ...infer Rest,
]
  ? First extends AnyFunction
    ? Parameters<First>
    : never
  : Parameters<F[0]>;

type PipeReturn<F extends Array<any> = AnyFunction[]> = F extends [
  ...infer First,
  infer Last,
]
  ? Last extends AnyFunction
    ? ReturnType<Last>
    : never
  : ReturnType<F[0]>;

export function pipe<F extends Array<AnyFunction>>(
  ...tasks: F
): (...initalArgs: PipeInitalArgs<F>) => PipeReturn<F> {
  return (...initalArgs: PipeInitalArgs<F>) => {
    let result = tasks[0]?.(...initalArgs);
    for (let i = 1; i < tasks.length; i++) {
      result = tasks[i]?.(result);
    }
    return result;
  };
}

type AnyAsyncFunction = (...args: any[]) => Promise<any>;

export function asyncPipe<F extends Array<AnyAsyncFunction>>(
  ...tasks: F
): (...initalArgs: PipeInitalArgs<F>) => Promise<PipeReturn<F>> {
  return async (...initalArgs: PipeInitalArgs<F>) => {
    let result = await tasks[0]?.(...initalArgs);
    for (let i = 1; i < tasks.length; i++) {
      result = await tasks[i]?.(result);
    }
    return result;
  };
}
