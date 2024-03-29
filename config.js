
export const config = {
  dir: {
    dist: 'dist/',
    blocks: 'src/blocks/',
    clean: {
      imgs: [
        'dist/img/**/*.{jpg,jpeg,png,svg,gif}',
        '!dist/img/favicons',
        '!dist/img/symbols.svg',
        '!dist/img/sprite.png',
        '!dist/img/sprite.webp'
      ],
      fonts: 'dist/fonts/**/*',
      pages: 'dist/*.html'
    },
    pages: 'src/pages/*.pug',
    pug: [
      'src/pug/**/*.pug',
      '!src/pug/helpers/blocks-mixins.pug'
    ],
    pugBlocks: 'src/blocks/**/*.pug',
    styles: {
      src: 'src/scss/style.scss',
      dist: 'dist/css/',
      watch: [
        'src/scss/**/*.scss',
        '!src/scss/helpers/blocks-mixins.scss'
      ]
    },
    stylesBlocks: 'src/blocks/**/*.scss',
    scripts: {
      src: 'src/js/app.js',
      dist: 'dist/js/',
      watch: [
        'src/js/**/*.js',
        'src/blocks/**/*.js'
      ]
    },
    imgs: {
      src: [
        'src/img/**/*.{jpg,jpeg,png,svg,gif}',
        '!src/img/sprite/*',
        '!src/img/symbols/*',
        '!src/img/favicon/*'
      ],
      dist: 'dist/img/',
      watch: [
        'src/img/**/*',
        '!src/img/favicon/*',
        '!src/img/sprite/*',
        '!src/img/symbols/*'
      ]
    },
    sprite: 'src/img/sprite/*',
    spriteCss: 'src/scss/base/',
    spriteImg: 'src/img/',
    symbols: 'src/img/symbols/*.svg',
    fonts: 'src/fonts/**/*',
    gzip: 'src/.htaccess',
    copy: 'src/assets/**/*',
    favicons: {
      src: 'src/img/favicon/favicon.png',
      dist: 'dist/img/favicons/'
    }
  }
};

// module.exports = config;
