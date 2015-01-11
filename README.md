# gifsickle

a node wrapper for [gifsicle](http://www.lcdf.org/gifsicle/) and
[gifsicle-bin](https://github.com/imagemin/gifsicle-bin).

specifically useful for setting delays for individual frames.

## install

``` sh
npm install gifsickle
```

## usage

``` js
var gifsickle = require('gifsickle');
var frames = require('glob').sync('*.gif').map(function(path) {
  return { path: path }
});

// set the delay of 0.5s to first frame
frames[0].delay = 50;

gifsickle('foo.gif', [
  frames: frames,
  delay: 15,
}, function() {
  console.log('gif is ready');
});
```
