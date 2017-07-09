# Locus

![locus](https://user-images.githubusercontent.com/1988660/27990421-b7d6b1f4-6491-11e7-80b0-dc5dabceb555.gif)

## Javascript and Paperscript

```html
<script type="text/javascript" src="js/init.js"></script>
<script type="text/javascript" src="js/paper-full.min.js"></script>
<script type="text/paperscript" src="js/app.js" canvas="myCanvas"></script>
```

I used exclude files, js and paperscript.

If you don't know about paperscript, please check below link.
[Paper.js — Working with Paper.js](http://paperjs.org/tutorials/getting-started/working-with-paper-js/)

## Loading SVG

In init.js, I define square SVG path.

```js
var pathSize = 400;
var pathData = "M10,10h" + pathSize + "v" + pathSize + "h" + "-" + pathSize + "z"
```

## Convert SVG to Path

```js
var svgPath = new Path(pathData);
svgPath.strokeColor = "#364F6B";
svgPath.strokeWidth = 2;
svgPath.position = view.center;
```




# Thanks

- [Paper.js](http://paperjs.org/)
