import gulp from 'gulp';

require('require-dir')('./tasks');


gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('fonts', 'sprite', 'symbols', 'favicons'),
  gulp.parallel('imgs', 'pug', 'scss', 'scripts'),
  'serve'
));

gulp.task('prod', gulp.series(
  'clean',
  gulp.parallel('fonts', 'sprite', 'symbols', 'favicons'),
  gulp.parallel('imgs', 'pug', 'scss', 'scripts', 'gzip', 'copy')
));

