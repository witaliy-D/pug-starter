import gulp from 'gulp';
import {config}from '../config.js';

const dir = config.dir;


export const fonts = () => {
  return gulp
    .src([dir.fonts], {base: 'src'})
    .pipe(gulp.dest(dir.dist));
};
