const assert = require("assert");
const get = require("./index");

const object = {
  a: { b: { c: 1 } },
  d: [{ e: 1 }, { e: 2 }, { e: 3 }, { f: 4 }],
  f: [{ g: [{ h: [1, 2, 3] }] }],
};

assert.deepStrictEqual(get(object, "a.b"), { c: 1 });

assert.deepStrictEqual(get(object, "a.b.c"), 1);

assert.deepStrictEqual(get(object, "a.b.c.d", 2), 2);

assert.deepStrictEqual(get(object, "d.e"), [1, 2, 3, undefined]);

assert.deepStrictEqual(get(object, "d[0].e"), 1);

assert.deepStrictEqual(get(object, "f[0].g[0].h"), [1, 2, 3]);

assert.deepStrictEqual(get(object, "f[0].g[0].h[1]"), 2);

const array = [{ a: 1 }, { a: 2 }];

assert.deepStrictEqual(get(array, "a"), [1, 2]);

assert.deepStrictEqual(get(array, "[1].a"), 2);
