import gulp from 'gulp';
import config from '../config';

const dir = config.dir;


gulp.task('fonts', () => {
  return gulp
    .src([dir.fonts], {base: 'src'})
    .pipe(gulp.dest(dir.dist));
});
