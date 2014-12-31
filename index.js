var execFile = require('child_process').execFile;
var gifsicle = require('gifsicle').path;
var R = require('ramda');
var fmt = require('util').format;

module.exports = function(dest, opts, cb) {
  var baseDelay = opts.delay != null ? opts.delay : 10;
  var args = [
    '-o', dest,
    '-d', String(baseDelay),
    '--loop',
    '-D', String(2)
  ];

  args = args.concat(R.pluck('path', opts.frames));
  execFile(gifsicle, args, function(err) {
    if (err) return cb(err);

    var delays = delaysForEachFrame(opts.frames, baseDelay);
    var delayArgs = R.chain(R.apply(delayArg), delays);

    args = [ '-b', dest ].concat(delayArgs);
    execFile(gifsicle, args, function(err) {
      if (err) cb(err);
      else     cb(null);
    });
  });
};

// use general delay or a delay specified for a single frame
function delaysForEachFrame(frames, baseDelay) {
  return R.map.idx(function(frame, i) {
    return [ i, frame.delay != null ? frame.delay : baseDelay ];
  }, frames);
}

function delayArg(frameIndex, delay) {
  return [ '-d', String(delay), fmt('#%s', frameIndex) ];
}
