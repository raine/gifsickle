var execFile = require('child_process').execFile;
var gifsicle = require('gifsicle').path;
var R = require('ramda');
var fmt = require('util').format;

module.exports = function(dest, opts, cb) {
  var args = [
    '-o', dest,
    '-d', String(opts.delay),
    '--loop',
    '-D', String(2)
  ];

  args = args.concat(opts.frames);
  execFile(gifsicle, args, function(err) {
    if (err) return cb(err);
    if (R.isEmpty(opts.frameDelays)) {
      cb(null);
    } else {
      args = [ '-b', dest ]
        .concat(formatDelayArgs(delaysForEachFrame(opts)));
      execFile(gifsicle, args, function(err) {
        if (err) cb(err);
        else     cb(null);
      });
    }
  });
};

// use general delay or a delay specified for a single frame
function delaysForEachFrame(opts) {
  var indexes = R.range(0, opts.frames.length);
  var mapDelays = R.map(function(i) {
    return [ i, opts.frameDelays[i] || opts.delay ];
  });

  return mapDelays(indexes);
}

function formatDelayArgs(delays) {
  return R.chain(unpack(delayArg), delays);
}

function delayArg(frameIndex, delay) {
  return ['-d', String(delay), fmt('#%s', frameIndex)];
}

function unpack(fn) {
  return function(args) {
    return fn.apply(this, args);
  };
}
