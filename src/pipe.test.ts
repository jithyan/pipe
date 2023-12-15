import { asyncPipe, pipe } from "./index.js";

describe("pipe tests", () => {
  test("1-arg", () => {
    const p = pipe(() => 1 + 2);
    expect(p()).toEqual(3);
  });

  test("2-arg", () => {
    const p = pipe(
      () => 1 + 2,
      (a) => a * 10,
    );
    expect(p()).toEqual(30);
  });

  test("3-arg", () => {
    const p = pipe(
      (a) => 1 + a,
      (a) => `${a}`,
      (a) => [a, a, a, a],
    );
    expect(p(2)).toEqual(["3", "3", "3", "3"]);
  });

  test("16-arg", () => {
    const p = pipe(
      (a) => 1 + a,
      (a) => `${a}`,
      (a) => [a, a],
      (a) => a.join(""),
      (a) => parseInt(a, 10),
      (a) => a * 2,
      (a) => a * 1,
      (a) => a * 2,
      (a) => a * 1,
      (a) => a * 2,
      (a) => a * 1,
      (a) => a * 2,
      (a) => a * 1,
      (a) => a * 2,
      (a) => a * 1,
      (a) => a * 2,
    );
    expect(p(0)).toEqual(704);
  });
});

describe("asyncPipe tests", () => {
  test("1-arg", async () => {
    const p = asyncPipe(() => Promise.resolve(1 + 2));
    expect(await p()).toEqual(3);
  });

  test("2-arg", async () => {
    const p = asyncPipe(
      () => Promise.resolve(1 + 2),
      (a) => Promise.resolve(a * 10),
    );
    expect(await p()).toEqual(30);
  });

  test("3-arg", async () => {
    const p = asyncPipe(
      (a) => Promise.resolve(1 + a),
      (a) => Promise.resolve(`${a}`),
      (a: string) => Promise.resolve([a, a, a, a]),
    );
    expect(await p(2)).toEqual(["3", "3", "3", "3"]);
  });

  test("16-arg", async () => {
    const p = asyncPipe(
      (a) => Promise.resolve(1 + a),
      (a) => Promise.resolve(`${a}`),
      (a) => Promise.resolve([a, a]),
      (a) => Promise.resolve(a.join("")),
      (a) => Promise.resolve(parseInt(a, 10)),
      (a) => Promise.resolve(a * 2),
      (a) => Promise.resolve(a * 1),
      (a) => Promise.resolve(a * 2),
      (a) => Promise.resolve(a * 1),
      (a) => Promise.resolve(a * 2),
      (a) => Promise.resolve(a * 1),
      (a) => Promise.resolve(a * 2),
      (a) => Promise.resolve(a * 1),
      (a) => Promise.resolve(a * 2),
      (a) => Promise.resolve(a * 1),
      (a) => Promise.resolve(a * 2),
    );
    expect(await p(0)).toEqual(704);
  });
});
