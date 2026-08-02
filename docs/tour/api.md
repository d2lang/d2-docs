---
pagination_next: tour/man
---

# D2 Oracle

D2 has an API built on top of its AST for **programmatically creating diagrams in Go**.
This package is `d2/d2oracle`.

This API is exercised heavily by Terrastruct to implement [bidirectional edits](https://youtu.be/EhxVVkxv2Ns?t=150). We have [comprehensive test coverage](https://github.com/d2lang/d2/blob/master/d2oracle/edit_test.go) of these functions. If there's any confusion from the docs, there's almost certainly a test that answers your question. (We're also happy to help, just file a GitHub issue!)

For a blog post detailing an example usage (building a SQL table diagram), see [https://terrastruct.com/blog/post/generate-diagrams-programmatically/](https://terrastruct.com/blog/post/generate-diagrams-programmatically/).

:::info No mutations
All functions in `d2oracle` are pure: they do not mutate the original graph, they return a new one. If you are chaining calls, don't forget to use the resulting graph from the previous call.
:::

## Create

Create a shape or connection.

```go
func Create(g *d2graph.Graph, boardPath []string, key string) (newG *d2graph.Graph, newKey string, _ error)
```

**Parameters**:
- `g`: D2 graph
- `boardPath`: Path of the board to modify. Only applicable to multi-board diagrams;
  otherwise, pass in `nil`.
- `key`: The ID of the shape or connection being created

**Return**:
- `newG`: The modified D2 graph
- `newKey`: The actual ID of the created shape or connection created

Everything specified in the given `key` will be created. So
for example, if you create a connection between 2 shapes that don't exist, they will be
  created in the same call. If you specify a nested object, it will create the parent
  containers if they do not exist.

```go
// This call creates 6 shapes and 1 connection
d2oracle.Create(g, nil, "a.b.c -> x.y.z")
```

If you call `Create` twice with the same shape ID, you will get an
error. If you call it twice with the same edge ID, you will create another edge.

`newKey` is the ID of the object created. This doesn't always match the input key.

For shapes, there may be an ID collision. `Create` appends a counter in this case.
```go
// newKey = "a"
g, newKey, _ = d2oracle.Create(g, nil, "a")
// newKey = "a 2"
_, newKey, _ = d2oracle.Create(g, nil, "a")
```


Connection IDs include the index.
```go
// newKey = "(a -> b[0])"
g, newKey, _ = d2oracle.Create(g, nil, "a -> b")
// newKey = "(a -> b[1])"
_, newKey, _ = d2oracle.Create(g, nil, "a -> b")
```

If you have a multi-board diagram like so:

```d2-incomplete
x

layers: {
  y: {}
}
```

```go
// This creates a shape "a" at the root
g, _ = d2oracle.Create(g, nil, "a")
// This creates a shape "a" at layer "y"
g, _ = d2oracle.Create(g, []string{"y"}, "a")
```

## Set

Set an attribute on a shape or connection.

```go
func Set(g *d2graph.Graph, boardPath []string, key string, tag, value *string) (newG *d2graph.Graph, _ error)
```

**Parameters**:
- `g`: D2 graph
- `boardPath`: Path of the board to modify. Only applicable to multi-board diagrams;
  otherwise, pass in `nil`.
- `key`: The identifier for the attribute
- `tag`: The language tag. This is only non-nil when text values are set that can be
  different languages, e.g. a code snippet value.
- `value`: Value being set

**Return**:
- `newG`: The modified D2 graph

The shape or connection that `Set` is modifying must exist.

```go
g, _, _ := d2oracle.Create(g, "a")
g, _ = d2oracle.Set(g, "a.style.fill", nil, "red")
```

If the attribute is already set, it is overwritten.

```go
// D2 graph: "a.style.fill: red"
g, _ = d2oracle.Set(g, "a.style.fill", nil, "red")
// D2 graph: "a.style.fill: blue"
g, _ = d2oracle.Set(g, "a.style.fill", nil, "blue")
```

Connections are targeted with an index.

```go
// Set the label of the first connection created
g, _ = d2oracle.Set(g, "(a -> b)[0].style.label", nil, "uno")
// Set the label of the second connection created
g, _ = d2oracle.Set(g, "(a -> b)[1].style.label", nil, "dos")
```

To unset an attribute, just pass `nil`.

```go
g, _ = d2oracle.Set(g, "a.style.fill", nil, nil)
g, _ = d2oracle.Set(g, "(a -> b)[0].style.label", nil, nil)
```

If you do not pass an attribute and just give the ID of a shape or connection, it will set
that object's primary value (usually label).

```go
// Sets `a`'s label to be Markdown text
g, _ = d2oracle.Set(g, "a", "md", "# I am A")
```



## Delete

Delete a shape or connection.

```go
func Delete(g *d2graph.Graph, boardPath []string, key string) (newG *d2graph.Graph, _ error)
```

**Parameters**:
- `g`: D2 graph
- `boardPath`: Path of the board to modify. Only applicable to multi-board diagrams;
  otherwise, pass in `nil`.
- `key`: The identifier for the shape or connection

**Return**:
- `newG`: The modified D2 graph

If you specify a container with children, those children will be deleted too.

```go
g, _, _ := d2oracle.Create(g, "a.b")
// `a.b` will also be deleted
g, _ = d2oracle.Delete(g, "a")
```

## Rename

Rename the ID of a shape or connection.

:::info
Note that the ID != label. If you want to change the label, use `Set`.
:::

```go
func Rename(g *d2graph.Graph, boardPath []string, key, newName string) (newG *d2graph.Graph, err error)
```

**Parameters**:
- `g`: D2 graph
- `boardPath`: Path of the board to modify. Only applicable to multi-board diagrams;
  otherwise, pass in `nil`.
- `key`: The current identifier for the shape or connection
- `newName`: The new identifier for the shape or connection

**Return**:
- `newG`: The modified D2 graph

Rename will rename all references of the given key.

```go
g, _, _ := d2oracle.Create(g, "a.b -> a.c")
// New D2: `z.b -> z.c`
g, _ = d2oracle.Rename(g, "a", "z)
```

## Move

Move a given shape or connection to a different container.

```go
func Move(g *d2graph.Graph, boardPath []string, key, newKey string) (newG *d2graph.Graph, err error)
```

:::info
If you give two keys of the same scope (e.g. "a" to "b"), it's the same as `Rename`.
:::

**Parameters**:
- `g`: D2 graph
- `boardPath`: Path of the board to modify. Only applicable to multi-board diagrams;
  otherwise, pass in `nil`.
- `key`: The current identifier for the shape or connection
- `newKey`: The new identifier for the shape or connection

**Return**:
- `newG`: The modified D2 graph

You can move things out of containers, into container, or across containers

```go
g, _, _ := d2oracle.Create(g, "a.b.c -> x.y.z")
// Move c out of b into a
g, _ = d2oracle.Move(g, "a.b.c", "a.c")
// Move c back into b
g, _ = d2oracle.Move(g, "a.c", "a.b.c")
// Move c into x.y.z
g, _ = d2oracle.Move(g, "a.b.c", "x.y.z.c")
```

## ID Deltas

For calls which can affect more than one ID, there is an API for getting a map of every single ID change.
This can be hard to keep track of; for example, if you move a container with many
descendants, the ID of all those descendants have changed, as well as all the connections
that reference anything within the container.

When would you use this? If you are keeping state of D2 objects somewhere else other than
the graph, e.g. in your own storage or writing back to somewhere, these calls should be
used to keep track of all programmatic changes.

Delta methods:
- MoveIDDeltas
- DeleteIDDeltas
- RenameIDDeltas

Each of these have the same input parameters as their counterparts, and return a string to
string map of ID changes.

Given this input D2 script:
```d2
x
y
x -> z
```

`deltas, err := MoveIDDeltas(g, nil, "x", "y.x")`

`deltas`:
```json
{
  "(x -> z)[0]": "(y.x -> z)[0]",
  "x": "y.x"
}
```
