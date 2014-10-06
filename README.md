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
  var gifsickle = require('gifsicle');
  var gifs = glob.sync('*.gif');

  gifsickle('foo.gif', {
    frames: gifs,
    delay: 15,
    frameDelays: {
      0: 50 // sets the delay of 0.5s to first frame
    }
  }, function() {
    console.log('gif is ready');
  });
```
