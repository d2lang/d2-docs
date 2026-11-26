# Imports

If your diagram [imports other D2 files](/tour/imports/), pass their paths and
contents to `renderSVG()` in `fs`. Set `inputPath` to the file to render.

In the [getting started example](/tour/d2js/#render-a-diagram), replace the `renderSVG()`
call with this one.

```js
const svg = await d2.renderSVG({
  fs: {
    "main.d2": "client -> db\ndb: @database",
    "database.d2": "shape: cylinder",
  },
  inputPath: "main.d2",
});
```

Here, `db` takes its cylinder shape from `database.d2`.
