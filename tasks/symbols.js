import gulp from 'gulp';
import imagemin, {svgo}from 'gulp-imagemin';
import svg from 'gulp-svg-sprite';

import {config}from '../config.js';

const dir = config.dir;

const pluginsSvgo = [
  {
    name: 'removeViewBox',
    active: false
  },
  {
    name: 'removeTitle',
    active: true
  }
];


export const symbols = () => {
  return gulp.src(dir.symbols)
    .pipe(imagemin([svgo({plugins: pluginsSvgo})]))
    .pipe(svg({
      mode: {
        stack: {
          sprite: '../symbols.svg'
        }
      }
    }))
    .pipe(gulp.dest(dir.imgs.dist));
};
