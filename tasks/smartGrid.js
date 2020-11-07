import gulp from 'gulp';
import smartgrid from 'smart-grid';
const breakpoints = '../breakpoints.json';


gulp.task('smartGrid', cb => {
  delete require.cache[require.resolve(breakpoints)];
  const options = require(breakpoints);
  smartgrid('./src/scss/helpers/mixins', {
    outputStyle: 'scss',
    filename: 'smart-grid-mixins',
    columns: 12, // number of grid columns
    offset: options.gridGutter + 'px', /* gutter width px || % */
    mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
    // mixinNames: {
    //   container: 'container'
    // },
    container: {
      maxWidth: options.containerMax + 'px', /* max-width оn very large screen */
      fields: options.fields + 'px' /* side fields */
    },
    breakPoints: {
      // xxl: {
      //   width: options.xxl + 'px'
      // },
      xl: {
        width: options.xl + 'px'
      },
      lg: {
        width: options.lg + 'px'
      },
      md: {
        width: options.md + 'px'
        // fields: '15px' /* set fields only if you want to change container.fields */
      }
      // sm: {
      //   width: options.sm + 'px'
      // }
      /*
          We can create any quantity of break points.

          some_name: {
              width: 'Npx',
              fields: 'N(px|%|rem)',
              offset: 'N(px|%|rem)'
          }
          */
    }
  });
  cb();
});

