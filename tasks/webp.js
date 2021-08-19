
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imageminWebp from 'imagemin-webp';
import webp from 'gulp-webp';
import debug from 'gulp-debug';
import yargs from 'yargs';
import config from '../config';

const argv = yargs.argv;
const production = !!argv.production;

const dir = config.dir;

gulp.task('webp', () => {
  return gulp.src(dir.imgs.src)
    .pipe(webp(gulpif(production, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(debug({title: 'webp'}))
    .pipe(gulp.dest(dir.imgs.dist));
});
