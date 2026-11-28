# Comentarios

D2 tiene comentarios de línea y comentarios de bloque.

## Comentarios de línea

Los comentarios de línea comienzan con un símbolo de numeral (`#`).

Pueden añadirse como una línea independiente:

```d2
# Los comentarios inician con un carácter numeral y continúan hasta la siguiente línea o hasta el final del archivo (EOF).
x -> y
```

o al final de la línea:

```d2
x -> y # Estoy al final de la línea
```

## Comentarios de bloque

Los comentarios de bloque comienzan y terminan con tres comillas dobles ("""):

```d2
x -> y

"""
Esto es un
comentario de bloque
"""

y -> z
```
