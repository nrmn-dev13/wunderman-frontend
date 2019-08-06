// 'use strict';
//global variable
var sources = require("./package.json"),
  gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sourcemaps = require("gulp-sourcemaps");

var browser_support = [
    "last 2 versions",
    "> 5%",
    "Firefox ESR",
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
  ],
  date = new Date().toISOString().slice(0, 10);
// HTML-task variable
var nunjucksRender = require("gulp-nunjucks-render");
//css-task variable
var sass = require("gulp-sass"),
  // cssnano = require("gulp-cssnano"),
  csso = require("gulp-csso"),
  autoprefixer = require("gulp-autoprefixer"),
  //js-task variable
  concat = require("gulp-concat"),
  // jshint        = require('gulp-jshint'),
  uglify = require("gulp-uglify"),
  //image-task variable
  imagemin = require("gulp-imagemin"),
  //staging & delivery variable
  copy = require("gulp-copy"),
  zip = require("gulp-zip");

// css task
gulp.task("sass", function() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "expanded", errLogToConsole: true }).on(
        "error",
        sass.logError
      )
    )
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(concat("style.min.css"))
    .pipe(csso({ autoprefixer: { browsers: browser_support, add: true } }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./site/assets/css/"))
    .pipe(browserSync.stream());
});
// javascript task
gulp.task("javascript", function() {
  return (
    gulp
      .src("./src/js/**/*.js")
      // .pipe(jshint('./.jshintrc'))
      // .pipe(jshint.reporter('default'))
      // .pipe(jshint.reporter('fail'))
      .pipe(sourcemaps.init())
      .pipe(concat("script.min.js"))
      // .pipe(uglify())
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest("./site/assets/js/"))
      .pipe(browserSync.stream())
  );
});
// template engine
gulp.task("nunjucks", function() {
  return gulp
    .src("./src/templates/pages/**/*.+(html|nunjucks|njk)")
    .pipe(
      nunjucksRender({
        path: ["./src/templates/components"]
      })
    )
    .pipe(gulp.dest("./site"))
    .pipe(browserSync.stream());
});
// html task
gulp.task("html", function() {
  return gulp
    .src("./site/*.html")
    .pipe(gulp.dest("./site"))
    .pipe(browserSync.stream());
});
// image optimizing
gulp.task("images", function() {
  return gulp
    .src([
      "./src/img/*.+(png|jpg|gif|svg)",
      "./src/img/**/*.+(png|jpg|gif|svg)"
    ])
    .pipe(imagemin())
    .pipe(gulp.dest("./site/assets/img"))
    .pipe(browserSync.stream());
});

// static server & task watch
gulp.task("default", function() {
  browserSync.init({
    server: "./site"
  });
  gulp.watch("src/sass/**/*.scss", function(event) {
    console.log(event);
    gulp.start("sass");
  });
  gulp.watch("src/js/**/*.js", function(event) {
    console.log(event);
    gulp.start("javascript");
  });
  gulp.watch(["src/img/**/*.+(png|jpg|gif|svg)"], function(event) {
    console.log(event);
    gulp.start("images");
  });
  gulp.watch(
    [
      "src/templates/pages/**/*.+(html|nunjucks|njk)",
      "src/templates/components/**/*.+(html|nunjucks|njk)"
    ],
    function(event) {
      console.log(event);
      gulp.start("nunjucks");
    }
  );
  gulp.watch("site/*.html", function(event) {
    console.log(event);
    gulp.start("html").on("change", browserSync.reload);
  });
});

// staging
// gulp.task('dist', function(){
// 	return gulp.src(['!./src/img/', '!./src/img/**', '!./src/sass/', '!./src/sass/**', '!./src/components/', '!./src/components/**', '!./src/templates/', '!./src/templates/**', '!./src/pages/', '!./src/pages/**', '!./src/js/', '!./src/js/**', '!./src/source/**', './src/**/*'])
//     .pipe(gulp.dest('./dist/'))
// });

// delivery & compress ( integrated with web & apps )
gulp.task("archive", function() {
  return gulp
    .src("./site/**/*")
    .pipe(zip("prod_" + "dist" + "_" + date + ".zip"))
    .pipe(gulp.dest("./archive"));
});
