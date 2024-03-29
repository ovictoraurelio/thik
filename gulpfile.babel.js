/* ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
♥
♥					Gulp main file, to simple projects
♥
♥					@author ovictoraurelio
♥					@github http://github.com/ovictoraurelio
♥					@website http://victoraurelio.com
♥
♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ */

'use strict';
import  os from 'os';
import  gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import bowerFiles from 'main-bower-files';
import inject from 'gulp-inject';
import gnf from 'gulp-npm-files';

var $ = loadPlugins();
var reload = browserSync.reload;

gulp.task('styles', () =>{
	return gulp.src('app/styles/main.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest('app/styles'))
});

gulp.task('jshint', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], () => {
  var assets = $.useref({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))//.on('error', $.gutil.log)
    .pipe($.if('*.css', $.cleanCss({compatibility: 'ie8'})))
    .pipe($.useref())
    .pipe($.if('*.html', htmlmin({collapseWhitespace: true, removeComments: true, empty: true, quotes: true,loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(bowerFiles().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('run', ['styles', 'watch'], () => {
  browserSync({
    notify: false,
		//browser: ["google-chrome"],
    //server: ['.tmp', 'app']
		server: {
			baseDir: './app',
			routes: {
	        '/.tmp/node_modules/': '.tmp/node_modules/'
	    }
		}
  });

  //gulp.watch(['app/**/*.html'], reload);
  //gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  //gulp.watch(['app/images/**/*'], reload);
});

gulp.task('serve:dist', ['default'], () => {
  browserSync({
    notify: false,
    server: 'dist'
  });
});

gulp.task('copy-to-tmp', () => {
	let vendor = gnf(null, './package.json');
	for (let file of vendor) {
			let t = file.split('/')[2];
			console.log('Including dependencie of '+t);
	   	gulp.src(file).pipe(gulp.dest('.tmp/node_modules/'+t));
	}
});

gulp.task('inject-vendor', ['copy-to-tmp'], () => {

	var wiredep = require('wiredep').stream;
	gulp.src('app/styles/*.scss')
	    .pipe(wiredep({bowerJson: require('./package.json')}))
	    .pipe(gulp.dest('app/styles'));

	  gulp.src('app/*.html')
	    .pipe(wiredep({
							bowerJson: require('./package.json'),
	            ignorePath: /^(\.\.\/)+/
	        }))
	    .pipe(gulp.dest('app'));
});

gulp.task('inject-src', function () {
  var sources = gulp.src(['app/**/*.js', './app/**/*.css'], {read: false});

	gulp.src('./app/index.html').pipe(inject(sources,{
      ignorePath: 'app',
      addRootSlash: false
  })).pipe(gulp.dest('./app'));
});

gulp.task('inject', ['inject-vendor', 'inject-src']);

gulp.task('watch', /*['connect'],*/ () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('package.json', ['inject']);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
