# Autoformat

Running `d2 file.d2` reads the diagram source and writes `file.svg`.

## Running the formatter {#running-formatter}

Suppose `file.d2` contains the following diagram.

```d2
aws_s3:    AWS S3 California{
  Monitoring ---------->California
}
```

Run `d2 fmt file.d2` to rewrite the source with standard spacing and arrow syntax.

```d2
aws_s3: AWS S3 California {
  Monitoring -> California
}
```

Some editor extensions can also run the formatter when you save a file.
