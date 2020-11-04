import gulp from 'gulp';
// import rename from 'gulp-rename';
// import svgstore from 'gulp-svgstore';
// import cheerio from 'gulp-cheerio';
// import replace from 'gulp-replace';
import svgmin from 'gulp-svgmin';
import svg from 'gulp-svg-sprite';
import config from '../config';


const dir = config.dir;

// gulp.task('symbols', () => {
//   return gulp.src(dir.symbols)
//     .pipe(svgmin({
//       js2svg: {pretty: true},
//       plugins: [{removeTitle: true}, {removeViewBox: false}]
//     }))
//     .pipe(svgstore({inlineSvg: true}))
//     .pipe(cheerio({
//       run($) {
//         // $('[fill]').removeAttr('fill');
//         $('[stroke]').removeAttr('stroke');
//         $('[style]').removeAttr('style');
//         $('svg').attr('style', 'display:none');
//       },
//       parserOptions: {xmlMode: true}
//     }))
//     .pipe(replace('&gt;', '>'))
//     .pipe(rename('symbols.svg'))
//     .pipe(gulp.dest(dir.imgs.dist));
// });


gulp.task('symbols', () => {
  return gulp.src(dir.symbols)
    .pipe(svgmin({
      js2svg: {pretty: true},
      plugins: [{removeTitle: true}, {removeViewBox: false}]
    }))
    .pipe(svg({
      mode: {
        stack: {
          sprite: '../symbols.svg'
        }
      }
    }))
    .pipe(gulp.dest(dir.imgs.dist));
});
