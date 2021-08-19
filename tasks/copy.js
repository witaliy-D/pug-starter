import gulp from 'gulp';
import config from '../config';

const dir = config.dir;

gulp.task('copy', () => {
  return gulp.src(dir.copy)
    .pipe(gulp.dest(dir.dist));
});
