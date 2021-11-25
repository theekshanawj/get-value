# get-value

Get value at a given path of an Object or an Array.

This util has enhanced the functionality of the <i> Lodash's </i> `get` by allowing <b> Array </b> access capability.

## Add to your application

```
npm i valueget
```

## Usage

### Function signature

```
get(object, path, defaultValue)
```

| parameter      | description                                         | example    |
| -------------- | --------------------------------------------------- | ---------- |
| `object`       | JavaScript Object or Array object                   | `{ a: 1 }` |
| `path`         | Path to the value inside the Object or Array        | `a.b.c`    |
| `defaultValue` | If the value is undefined default value is returned | `""`       |

### Access patterns

#### Object

Value of a key inside an Object can be accessed by giving the path separated by a dot (`.`)

```
ex:

const obj = { a: { b: { c: { d: 1 } } } };

get(obj, 'a.b.c.d')
// 1
```

### Array

#### Array inside of an object

Use the dot (`.`) to access the nested values and use the `[]` with the index to access array elements.

```
ex:

const obj = { a: { b: [1, 2, 3] } };

get(obj, 'a.b[1]')
// 2

```

##### Special case 

If `[]` is not used when an array is accessed inside of an Object, this util will return an array of values specified by the path

```
ex:

const object = {
  a: [{ b: 1 }, { b: 2 }, { b: 3 }],
};

get(obj, 'a.b')
// [1, 2, 3]
```

#### Direct array access

Value inside array can be accessed specifying `[]` without an identifier 

```
ex:

const arr = [{ a: { b: 2}}];

get(arr, '[0].a.b') -> 2
```

## Examples 

```
const object = {
  a: { b: { c: 1 } },
  d: [{ e: 1 }, { e: 2 }, { e: 3 }, { f: 4 }],
  f: [{ g: [{ h: [1, 2, 3] }] }],
};

get(object, "a.b")
// { c: 1 }

get(object, "a.b.c")
// 1

get(object, "a.b.c.d", 2)
// 2

get(object, "d.e")
// [1, 2, 3, undefined]

get(object, "d[0].e") 
// 1

get(object, "f[0].g[0].h")
// [1, 2, 3]

get(object, "f[0].g[0].h[1]")
// 2

const array = [{ a: 1 }, { a: 2 }];

get(array, "a")
// [1, 2]

get(array, "[1].a")
// 2

```

