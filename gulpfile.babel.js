import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
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
// import cssnano from "gulp-cssnano";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import hash from "gulp-hash";
import del from "del";
import copy from "gulp-copy";
import zip from "gulp-zip";

const browserSync = BrowserSync.create();
const hugoBin = `./bin/hugo.${process.platform === "win32" ? "exe" : process.platform}`;
const defaultArgs = ["-d", "../dist", "-s", "site"];

var browser_support = [
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

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug")
}

// hugo task
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));
// gulp.task("build", ["css", "js", "cms-assets", "hugo"]);
gulp.task("build", ["sass", "js", "cms-assets", "hugo"]);
// gulp.task("build-preview", ["css", "js", "cms-assets", "hugo-preview"]);
gulp.task("build-preview", ["sass", "js", "cms-assets", "hugo-preview"]);

// post css task
gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([
      cssImport({from: "./src/css/main.css"}),
      cssnext(),
      cssnano(),
    ]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

// sass task 
gulp.task('sass', () => {
  return gulp.src("./src/sass/**/*.scss")
    .pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded', errLogToConsole: true}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(concat('style.min.css'))
    .pipe(csso({autoprefixer: {browsers: browser_support, add: true} }))	
    .pipe(sourcemaps.write('../maps'))
    // .pipe(hash())
    .pipe(gulp.dest("./dist/css/"))
     //Create a hash map
    //  .pipe(hash.manifest("hash.json"))
    //  .pipe(gulp.dest("data/css"))
    .pipe(browserSync.stream())
});

// cms task
gulp.task("cms-assets", () => (
  gulp.src("./node_modules/netlify-cms/dist/*.{woff,eot,woff2,ttf,svg,png}")
    .pipe(gulp.dest("./dist/css"))
))

// javascript task
gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

// svg task
gulp.task("svg", () => {
  const svgs = gulp
    .src("site/static/img/icons-*.svg")
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("site/layouts/partials/"));
});

// gulp.task("server", ["hugo", "css", "cms-assets", "js", "svg"], () => {
gulp.task("server", ["hugo", "sass", "cms-assets", "js", "svg"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  // gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./site/static/img/icons-*.svg", ["svg"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
