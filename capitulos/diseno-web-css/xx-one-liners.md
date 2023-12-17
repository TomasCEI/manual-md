Muchas veces podemos combinar varias reglas CSS en una única linea. Esto es útil cuando queremos mantener nuestro código lo mas compacto posible. Recuerden que compacto no significa ilegible. Siempre debemos mantener nuestro código ordenado y legible.

Por ejemplo cuando queremos aplicar estilos a nuestros bordes podemos hacerlo de la siguiente manera:

```css
/* En vez de escribir 3 reglas (width, style, color) */
div {
  border-width: 1px;
  border-style: dashed;
  border-color: gray;
}

/* Podemos hacerlo en una única linea */
div {
  border: 1px dashed gray;
}
```

Ya hemos estado utilizando esta nomenclatura en ejemplos anteriores. Veamos algunos otros estilos que podremos aplicar de esta manera:

```css
div {
  /* Margin > top, right, bottom, left */
  margin: 10px 20px 30px 40px;

  /* Padding > top, right, bottom, left */
  padding: 5px;

  /* Padding > top/bottom, right/left */
  padding: 5px 10px;

  /* Font > style, weight, size/line-height, font-family */
  font: italic bold 16px/1.5 "Times New Roman", serif;

  /* Background > color, image, repeat, position */
  background: #f0f0f0 url("background.jpg") no-repeat center center;

  /* Transition > property, duration, timing-function */
  transition: width 0.3s ease-in-out, color 0.3s linear;

  /* BoxShadow > horizontal offset, vertical offset, blur radius, color */
  box-shadow: 2px 2px 5px #888888;

  /* TextShadow > horizontal offset, vertical offset, blur radius, color */
  text-shadow: 1px 1px 2px #333;

  /* BorderRadius > top-left, top-right, bottom-right, bottom-left */
  border-radius: 10px;

  /* Flex > flex-grow, flex-shrink, flex-basis */
  flex: 1 1 auto;

  /* Grid > rows, columns */
  grid-template: auto / repeat(3, 1fr);

  /* Transform > translate, rotate, scale, skew */
  transform: translate(10px, 20px) rotate(45deg);
}
```
