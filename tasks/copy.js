import gulp from 'gulp';
import {config}from '../config.js';

const dir = config.dir;

export const copy = () => {
  return gulp.src(dir.copy)
    .pipe(gulp.dest(dir.dist));
};
