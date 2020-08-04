import gulp from 'gulp';
import del from 'del';
import config from '../config';

const dir = config.dir;

gulp.task('clean', () => {
  return del(dir.dist);
});

gulp.task('cleanImgs', () => {
  return del(dir.clean.imgs);
});


gulp.task('cleanFonts', () => {
  return del(dir.clean.fonts);
});

gulp.task('cleanPages', () => {
  return del(dir.clean.pages);
});

