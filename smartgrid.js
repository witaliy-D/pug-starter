const smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
const settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  filename: 'smart-grid-mixins',
  columns: 12, /* number of grid columns */
  offset: '20px', /* gutter width px || % */
  mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
  // mixinNames: {
  //   container: 'container'
  // },
  container: {
    maxWidth: '980px', /* max-width оn very large screen */
    fields: '20px' /* side fields */
  },
  breakPoints: {
    xl: {
      width: '1200px'
    },
    lg: {
      width: '992px'
    },
    md: {
      width: '768px'
      // fields: '15px' /* set fields only if you want to change container.fields */
    }
    // sm: {
    //   width: '480px'
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
};

smartgrid('./src/scss/helpers/mixins', settings);
