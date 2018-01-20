import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
// import postcss from "gulp-postcss";
// import cssImport from "postcss-import";
// import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import replace from "gulp-replace";
import cssnano from "cssnano";

import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import sass from "gulp-sass";
import csso from "gulp-csso";
import nunjucksRender from "gulp-nunjucks-render";
// import cssnano from "gulp-cssnano";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import hash from "gulp-hash";
import del from "del";
import copy from "gulp-copy";
import zip from "gulp-zip";
import sources from "./package.json";


const browserSync   = BrowserSync.create();
const date        = new Date().toISOString().slice(0,10);
const browser_support = [
      'last 2 versions', 
      '> 5%', 
      'Firefox ESR',
      "ie >= 10",
      "ie_mob >= 10",
      "ff >= 30",
      "chrome >= 34",
      "safari >= 7",
      "opera >= 23",
      "ios >= 7",
      "android >= 4.4",
      "bb >= 10"
    ];

// sass task 
gulp.task('sass', function() {
  return gulp.src("./src/sass/**/*.scss")
    .pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded', errLogToConsole: true}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(concat('style.min.css'))
    .pipe(csso({autoprefixer: {browsers: browser_support, add: true} }))	
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest("./site/assets/css/"))
    .pipe(browserSync.stream())
});

// javascript task
gulp.task('javascript', function() {
  // return gulp.src('./src/js/**/*.js')
  //   // .pipe(jshint('./.jshintrc'))
  //   // .pipe(jshint.reporter('default'))
  //   // .pipe(jshint.reporter('fail'))
  //   .pipe(sourcemaps.init())
	// 	.pipe(concat('script.min.js'))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('../maps'))
  //   .pipe(gulp.dest('./site/assets/js/'))
  //   .pipe(browserSync.stream())

  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    // browserSync.reload();
  });
});

// template engine
gulp.task('nunjucks', function() {
	return gulp.src('./src/templates/pages/**/*.+(html|nunjucks|njk)')
		.pipe(nunjucksRender({
		path: ['./src/templates/components']
	}))
		.pipe(gulp.dest('./site'))
		.pipe(browserSync.stream())
});

// html task
gulp.task('html', function() {
  return gulp.src('./site/*.html')
    .pipe(gulp.dest('./site'))
    .pipe(browserSync.stream())
});

// image optimizing
gulp.task('images', function(){
	return gulp.src(['./src/img/*.+(png|jpg|gif|svg)', './src/img/**/*.+(png|jpg|gif|svg)'])
		.pipe(imagemin())
		.pipe(gulp.dest('./site/assets/img'))
		.pipe(browserSync.stream())
});

// static server & task watch
gulp.task('default', function() {
  browserSync.init({
    server: "./site"
  });
  gulp.watch('src/sass/**/*.scss', function (event) {
    console.log(event);
    gulp.start('sass');
  });
  gulp.watch('src/js/**/*.js', function (event) {
    console.log(event);
    gulp.start('javascript');
  });
	gulp.watch(['src/img/**/*.+(png|jpg|gif|svg)'], function (event) {
		console.log(event);
		gulp.start('images');
	});
	gulp.watch(['src/templates/pages/**/*.+(html|nunjucks|njk)', 'src/templates/components/**/*.+(html|nunjucks|njk)'], function (event) {
			console.log(event);
			gulp.start('nunjucks');
		});
  gulp.watch('site/*.html', function (event) {
    console.log(event);
    gulp.start('html').on('change', browserSync.reload);
  });
});

// staging
// gulp.task('dist', function(){
// 	return gulp.src(['!./src/img/', '!./src/img/**', '!./src/sass/', '!./src/sass/**', '!./src/components/', '!./src/components/**', '!./src/templates/', '!./src/templates/**', '!./src/pages/', '!./src/pages/**', '!./src/js/', '!./src/js/**', '!./src/source/**', './src/**/*'])
//     .pipe(gulp.dest('./dist/'))
// });

// delivery & compress ( integrated with web & apps )
gulp.task('archive', function(){
	return gulp.src('./site/**/*')
		.pipe(zip( 'prod_'+ 'dist' + '_' + date +'.zip'))
    .pipe(gulp.dest('./archive'))
});