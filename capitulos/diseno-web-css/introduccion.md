# introducción CSS

hola soy el capiotulo 2



[Ecampus2](https://ecampus.com.ar)

## Lista de items 
- item 1_2
- item 2_2
- item 3_2

```html
<h1>hola soy un h1</h1>
<p>parrafo</p>
```

```css	
h1 {
    color: red;
}
```

```js
console.log('hola soy un console.log');
```

```diff-html 
- <span>hola soy un vieja console.log</span>
+ <span>hola soy un nuevo console.log</span>
```

```diff diff-html 
- <span>hola soy un vieja console.log</span>
+ <span>hola soy un nuevo console.log</span>
```


**Browser**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
</head>
<body>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML =
      marked.parse('# Marked in browser\n\nRendered by **marked**.');
  </script>
</body>
</html>
```

We actively support the features of the following [Markdown flavors](https://github.com/commonmark/CommonMark/wiki/Markdown-Flavors).

| Flavor                                                     | Version | Status                                                             |
| :--------------------------------------------------------- | :------ | :----------------------------------------------------------------- |
| The original markdown.pl                                   | --      |                                                                    |
| [CommonMark](http://spec.commonmark.org/0.30/)             | 0.30    | [Work in progress](https://github.com/markedjs/marked/issues/1202) |
| [GitHub Flavored Markdown](https://github.github.com/gfm/) | 0.29    | [Work in progress](https://github.com/markedjs/marked/issues/1202) |