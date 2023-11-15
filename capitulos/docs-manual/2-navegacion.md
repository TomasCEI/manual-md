
## Lista de Clases para aplicar estilos a nuestro manual

```html
<nav>
  <ul>
    <!-- Chapter Navigation Item with active state -->
    <li class="Nav-capitulo active">
      <a href="#">Capitulo 1 (activo)</a>
    </li>

    <!-- Chapter Navigation Item without active state -->
    <li class="Nav-capitulo">
      <a href="#">Capítulo 2</a>
    </li>
    <li>
      <ul class="Nav-articulos">
          <li class="Nav-articulo"><a href="#">Artículo 1</a></li>
          <li class="Nav-articulo active"><a href="#">Artículo 2 (activo)</a></li>
        </ul>
    </li>
  </ul>
</nav>
```