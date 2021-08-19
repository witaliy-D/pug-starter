import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import config from '../config';

const dir = config.dir;

gulp.task('sprite', () => {
  const spriteData = gulp.src(dir.sprite)
    .pipe(imagemin([imagemin.mozjpeg({progressive: true}), pngquant()]))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      imgPath: '../img/sprite.png',
      padding: 1
    }));
  const imgStream = spriteData.img
    .pipe(gulp.dest(dir.imgs.dist));
  const cssStream = spriteData.css
    .pipe(gulp.dest(dir.spriteCss));
  return merge(imgStream, cssStream);
});
