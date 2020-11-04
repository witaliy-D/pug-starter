import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';
import debug from 'gulp-debug';
import yargs from 'yargs';
import config from '../config';
import pugLinter from 'gulp-pug-linter';


const dir = config.dir;

const argv = yargs.argv;
const production = !!argv.production;

const prettyOption = {
  // eslint-disable-next-line camelcase
  indent_size: 2,
  // eslint-disable-next-line camelcase
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
  // eslint-disable-next-line camelcase
  content_unformatted: []
};

gulp.task('pug', () => {
  return gulp.src(dir.pages)
    .pipe(plumber({
      errorHandler(err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(pug())
    .pipe(prettyHtml(prettyOption))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(debug({title: 'pug'}))
    .pipe(gulp.dest(dir.dist));
});


gulp.task('pugFast', () => {
  return gulp.src(dir.pages, {since: gulp.lastRun('pugFast')})
    .pipe(plumber({
      errorHandler(err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(pug())
    .pipe(prettyHtml(prettyOption))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(debug({title: 'pug'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('pugLint', () => (
  gulp
    .src('src/**/*.pug')
    .pipe(pugLinter({reporter: 'default'}))
));
