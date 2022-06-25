import gulp from 'gulp';
import gulpif from 'gulp-if';
import imageminWebp from 'imagemin-webp';
import webpImg from 'gulp-webp';
import debug from 'gulp-debug';

import {config}from '../config.js';


const production = !!process.argv.includes('--production');

const dir = config.dir;

export const webp = () => {
  return gulp.src(dir.imgs.src)
    .pipe(webpImg(gulpif(production, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(debug({title: 'webp'}))
    .pipe(gulp.dest(dir.imgs.dist));
};
