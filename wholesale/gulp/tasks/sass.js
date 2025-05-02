'use strict';
const gulp = require('gulp');
const fs = require('fs');
const args = require('ns-args').argv();
require('./init');

gulp.task('sass-prepare', (cb) =>
{
	var sass_helper = require('../extension-mechanism/local-tasks/sass');
	sass_helper.generateEntryPoints(cb);
});

gulp.task('clean-sass-tmp',(cb) =>
{
	fs.rmSync( 'tmp', { recursive: true, force: true });
	cb();
});

gulp.task('compile-sass', (gulpDone) =>
{
	var watch_manager = require('../extension-mechanism/watch-manager')
	,	sass_helper = require('../extension-mechanism/local-tasks/sass');

	sass_helper.compileEntryPoints(() => {
		// register sass file watch
		var to_execute = ['sass'];

		watch_manager.registerWatch(sass_helper.local_folders, to_execute);

		gulpDone();
	});
});

gulp.task('sass', gulp.series('sass-prepare', 'compile-sass', 'clean-sass-tmp'));