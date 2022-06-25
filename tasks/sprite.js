import gulp from 'gulp';
import imagemin, {mozjpeg}from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';

import {config}from '../config.js';

const dir = config.dir;

export const sprite = () => {
  const spriteData = gulp.src(dir.sprite)
    .pipe(imagemin([mozjpeg({progressive: true}), pngquant()]))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      imgPath: '../img/sprite.png',
      padding: 1
    }));
  const imgStream = spriteData.img
    .pipe(gulp.dest(dir.spriteImg));
  const cssStream = spriteData.css
    .pipe(gulp.dest(dir.spriteCss));
  return merge(imgStream, cssStream);
};
