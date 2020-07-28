import gulp from 'gulp';
import server from 'browser-sync';
import config from '../config';

const dir = config.dir;

function reload(done) {
	server.reload();
	done();
}

gulp.task('serve', () => {
	server.init({
		server: dir.dist
	});

	gulp.watch(dir.pages, {events: ['change', 'add']}, gulp.series('pug', reload));
	gulp.watch(dir.pages, {events: ['unlink']}, gulp.series('cleanPages', 'pug', reload));
	gulp.watch(dir.pug, gulp.series('pug', reload));

	gulp.watch(dir.styles.watch, gulp.parallel('scss'));

	gulp.watch(dir.scripts.watch, gulp.series('scripts', reload));

	gulp.watch(dir.imgs.watch, {events: ['unlink']}, gulp.series('cleanImgs', 'imgs', reload));
	gulp.watch(dir.imgs.watch, {events: ['change', 'add']}, gulp.series('imgs', reload));

	gulp.watch(dir.sprite, gulp.series('sprite', reload));

	gulp.watch(dir.symbols, gulp.series('symbols', reload));

	gulp.watch(dir.fonts, {events: ['unlink']}, gulp.series('cleanFonts', 'fonts', reload));
	gulp.watch(dir.fonts, {events: ['add']}, gulp.series('fonts', reload));
});
