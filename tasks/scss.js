import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import objectFitImages from 'postcss-object-fit-images';
import inlineSVG from 'postcss-inline-svg';
import atImport from 'postcss-import';
import postcss from 'gulp-postcss';
import cleancss from 'gulp-clean-css';
import rename from 'gulp-rename';
import debug from 'gulp-debug';
import server from 'browser-sync';
import yargs from 'yargs';
import mqpacker from 'postcss-sort-media-queries';
import webpcss from 'webp-in-css/plugin';

import config from '../config';

const sass = require('gulp-sass')(require('sass'));

const dir = config.dir;

const argv = yargs.argv;
const production = !!argv.production;

const cleancssOption = {
  level: {
    1: {
      specialComments: 0,
      removeEmpty: true,
      removeWhitespace: true
    },
    2: {
      mergeMedia: true,
      removeEmpty: true,
      removeDuplicateFontRules: true,
      removeDuplicateMediaBlocks: true,
      removeDuplicateRules: true,
      removeUnusedAtRules: false
    }
  }
};

// Список и настройки плагинов postCSS
const postCssPlugins = [
  mqpacker({sort: 'mobile-first'}),
  webpcss(),
  autoprefixer({grid: true}),
  atImport(),
  inlineSVG(),
  objectFitImages()
];


gulp.task('scss', () => {
  const onError = function (err) {
    notify.onError({
      title: 'Error in scss task',
      message: 'Error: <%= error.message %>',
      sound: 'Beep'
    })(err);
    this.emit('end');
  };
  return gulp.src(dir.styles.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(postCssPlugins))
    .pipe(gulpif(production, cleancss(cleancssOption)))
    .pipe(gulpif(production, rename({suffix: '.min'})))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(debug({title: 'scss'}))
    .pipe(gulp.dest(dir.styles.dist))
    .on('end', server.reload);
});
