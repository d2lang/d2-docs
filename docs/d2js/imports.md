# Imports

If your diagram [imports other D2 files](/tour/imports/), pass their paths and
contents to `compile` in `fs`. Set `inputPath` to the file to render.

In the [getting started example](/d2js/#render-a-diagram), replace the `compile`
call with this one.

```js
const { diagram, renderOptions } = await d2.compile({
  fs: {
    "main.d2": "client -> db\ndb: @database",
    "database.d2": "shape: cylinder",
  },
  inputPath: "main.d2",
});
```

Here, `db` takes its cylinder shape from `database.d2`.
