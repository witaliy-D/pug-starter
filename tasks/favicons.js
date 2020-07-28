import gulp from 'gulp';
import favicons from 'gulp-favicons';
import config from '../config';

const dir = config.dir;


gulp.task('favicons', () => {
	return gulp.src(dir.favicons.src)
		.pipe(favicons({
			icons: {
				appleIcon: true,
				favicons: true,
				online: false,
				appleStartup: false,
				android: false,
				firefox: false,
				yandex: false,
				windows: false,
				coast: false
			}
		}))
		.pipe(gulp.dest(dir.favicons.dist));
});
