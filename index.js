var execFile = require('child_process').execFile;
var gifsicle = require('gifsicle').path;
var _ = require('lodash');
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
    if (_.isEmpty(opts.frameDelays)) {
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
  return _.map(_.range(0, opts.frames.length), function(i) {
    return [ i, opts.frameDelays[i] || opts.delay ];
  });
}

function formatDelayArgs(delays) {
  return _.flatten(_.map(delays, unpack(delayArg)));

  function delayArg(frameIndex, delay) {
    return ['-d', String(delay), fmt('#%s', frameIndex)];
  }
}

function unpack(fn) {
  return function(args) {
    return fn.apply(this, args);
  };
}
