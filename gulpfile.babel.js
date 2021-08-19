import gulp from 'gulp';

require('require-dir')('./tasks');


gulp.task('default', gulp.series(
  gulp.parallel('clean', 'writePugMixinsFile', 'writeSassImportsFile'),
  gulp.parallel(
    'fonts',
    'sprite',
    'symbols',
    'favicons',
    'webp'
  ),
  gulp.parallel('imgs', 'pug', 'scss', 'scripts'),
  'serve'
));

gulp.task('prod', gulp.series(
  gulp.parallel('clean', 'writePugMixinsFile', 'writeSassImportsFile'),
  gulp.parallel(
    'fonts',
    'sprite',
    'symbols',
    'favicons',
    'webp'
  ),
  gulp.parallel(
    'imgs',
    'pug',
    'scss',
    'scripts',
    'gzip',
    'copy'
  )
));

