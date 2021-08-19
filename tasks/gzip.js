import gulp from 'gulp';
import debug from 'gulp-debug';
import config from '../config';

const dir = config.dir;

gulp.task('gzip', () => {
  return gulp.src(dir.gzip)
    .pipe(gulp.dest(dir.dist))
    .pipe(debug({
      title: 'GZIP config'
    }));
});
