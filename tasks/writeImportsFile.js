import gulp from 'gulp';
import fs from 'fs';

// Сообщение для компилируемых файлов
const doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';


/**
 * Проверка существования файла или папки
 * @return {boolean}
 * @param filepath
 */
function fileExist(filepath){
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  }catch (e){
    flag = false;
  }
  return flag;
}


/**
 * Получение всех названий поддиректорий, содержащих файл указанного расширения, совпадающий по имени с поддиректорией
 * @param  {string} ext    Расширение файлов, которое проверяется
 * @return {array}         Массив из имён блоков
 */
function getDirectories(ext) {
  const source = 'src/blocks/';
  return fs.readdirSync(source)
    .filter(item => fs.lstatSync(source + item).isDirectory())
    .filter(item => fileExist(source + item + '/' + item + '.' + ext));
}

gulp.task('writePugMixinsFile', cb => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm, '\n  ');
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ${'src/blocks/'.replace('src', '../..')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/pug/helpers/blocks-mixins.pug', pugMixins);
  console.log('---------- Write new blocks-mixins.pug');
  cb();
});


gulp.task('writeSassImportsFile', cb => {
  const allBlocksWithScssFiles = getDirectories('scss');
  let styleImports = `/* !*${doNotEditMsg.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
  allBlocksWithScssFiles.forEach(function (blockName) {
    styleImports += `@import 'src/blocks/${blockName}/${blockName}';\n`;
  });
  fs.writeFileSync('src/scss/helpers/blocks-mixins.scss', styleImports);
  console.log('---------- Write new blocks-mixins.scss');
  cb();
});


