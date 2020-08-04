import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import yargs from 'yargs';
import gulpif from 'gulp-if';
import config from '../config';

const argv = yargs.argv;
const production = !!argv.production;

const dir = config.dir;

const pluginsSvgo = [
  {removeViewBox: true},
  {removeTitle: true}
];

const pluginsImagemin = [
  imagemin.mozjpeg({progressive: true}),
  pngquant()
];

gulp.task('imgs', () => {
  return gulp.src(dir.imgs.src)
    .pipe(imagemin([imagemin.svgo({plugins: pluginsSvgo})]))
    .pipe(gulpif(production, imagemin(pluginsImagemin)))
    .pipe(gulp.dest(dir.imgs.dist));
});
