import gulp from 'gulp';
import {clean}from './tasks/clean.js';
import {imgs}from './tasks/imgs.js';
import {symbols}from './tasks/symbols.js';
import {sprite}from './tasks/sprite.js';
import {fonts}from './tasks/fonts.js';
import {webp}from './tasks/webp.js';
import {scripts}from './tasks/scripts.js';
import {pug, pugLint}from './tasks/pug.js';
import {scss}from './tasks/scss.js';
import {serve}from './tasks/serve.js';
import {favicons}from './tasks/favicons.js';
import {copy}from './tasks/copy.js';
import {writePugMixinsFile, writeSassImportsFile}from './tasks/writeImportsFile.js';


export default gulp.series(
  gulp.parallel(
    clean,
    writePugMixinsFile,
    writeSassImportsFile
  ),
  gulp.parallel(
    fonts,
    sprite,
    symbols,
    favicons,
  ),
  gulp.parallel(
    webp,
    imgs,
    pug,
    scss,
    scripts
  ),
  serve
);

export const prod = gulp.series(
  gulp.parallel(
    clean,
    writePugMixinsFile,
    writeSassImportsFile
  ),
  gulp.parallel(
    fonts,
    sprite,
    symbols,
    favicons,
  ),
  gulp.parallel(
    webp,
    imgs,
    pug,
    scss,
    scripts,
    copy
  )
);

export const puglint = gulp.series(
  pugLint
);
