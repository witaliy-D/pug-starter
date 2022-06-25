import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import webstream from 'webpack-stream';
import webpack from 'webpack';
import debug from 'gulp-debug';

import {config}from '../config.js';

const dir = config.dir;


const production = !!process.argv.includes('--production');


export const scripts = () => {
  return gulp.src(dir.scripts.src)
    .pipe(plumber())
    .pipe(webstream({
      mode: production ? 'production' : 'development',
      devtool: production ? false : 'source-map',
      entry: {
        app: './src/js/app.js'
        // index: './src/js/pageEntry/index.js'
        // page: './srs/js/pageEntry/page.js'
      },
      output: {
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }, webpack))
    .pipe(gulpif(production, rename({suffix: '.min'})))
    .pipe(debug({title: 'JS '}))
    .pipe(gulp.dest(dir.scripts.dist));
};
