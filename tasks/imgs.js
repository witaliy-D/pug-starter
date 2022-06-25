import gulp from 'gulp';
import imagemin, {mozjpeg, svgo}from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import gulpif from 'gulp-if';
import {config}from '../config.js';

const production = !!process.argv.includes('--production');

const dir = config.dir;

const pluginsSvgo = [
  {
    name: 'removeViewBox',
    active: true
  },
  {
    name: 'removeTitle',
    active: true
  }
];

const pluginsImagemin = [
  mozjpeg({progressive: true}),
  pngquant()
];

export const imgs = () => {
  return gulp.src(dir.imgs.src)
    .pipe(imagemin([svgo({plugins: pluginsSvgo})]))
    .pipe(gulpif(production, imagemin(pluginsImagemin)))
    .pipe(gulp.dest(dir.imgs.dist));
};





