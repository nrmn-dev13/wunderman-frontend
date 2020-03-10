//global variable
const source = require("./package.json");
const { src, dest, parallel, series, watch, task } = require("gulp");
const browsersync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const date = new Date().toISOString().slice(0, 10);

// HTML-task variable
const nunjucksRender = require("gulp-nunjucks-render");

//css-task variable
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");

//js-task variable
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

//image-task variable
const imagemin = require("gulp-imagemin");

//staging & delivery variable
const copy = require("gulp-copy");
const zip = require("gulp-zip");

// const browserslist = ["last 1 version", "> 1%", "IE 10"];

// css task
function scss() {
  return (
    src("./src/sass/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(
        sass({ outputStyle: "expanded", errLogToConsole: true }).on(
          "error",
          sass.logError
        )
      )
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false
        })
      )
      .pipe(concat("style.min.css"))
      // .pipe(csso({ autoprefixer: { browsers: browserslist, add: true } }))
      .pipe(csso())
      .pipe(sourcemaps.write("../maps"))
      .pipe(dest("./site/assets/css/"))
  );
}

// javascript task
function js() {
  return src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("script.min.js"))
    .pipe(sourcemaps.write("../maps"))
    .pipe(dest("./site/assets/js/"));
}
// template engine
function njk() {
  return src("./src/templates/pages/**/*.+(html|nunjucks|njk)")
    .pipe(
      nunjucksRender({
        path: ["./src/templates/components"]
      })
    )
    .pipe(dest("./site"));
}

// image optimizing
function img() {
  return src([
    "./src/img/*.+(png|jpg|gif|svg)",
    "./src/img/**/*.+(png|jpg|gif|svg)"
  ])
    .pipe(imagemin())
    .pipe(dest("./site/assets/img"));
}

// browserSync
function browserSync() {
  browsersync.init({
    server: "./site"
  });
}

// BrowserSync reload
function browserReload() {
  return browsersync.reload;
}

// static server & task watch
function watchFiles() {
  // watch scss
  watch("src/sass/**/*.scss", parallel(scss)).on("change", browserReload());
  // Watch javascripts
  watch("src/js/**/*.js", parallel(js)).on("change", browserReload());
  // Watch images
  watch(["src/img/**/*.+(png|jpg|gif|svg)"], parallel(img)).on(
    "change",
    browserReload()
  );
  // Watch template
  watch(
    [
      "src/templates/pages/**/*.+(html|nunjucks|njk)",
      "src/templates/components/**/*.+(html|nunjucks|njk)"
    ],
    parallel(njk)
  ).on("change", browserReload());
}

// delivery & compress ( integrated with web & apps )
task("archive", function archive() {
  return src("./site/**/*")
    .pipe(zip("prod_" + "dist" + "_" + date + ".zip"))
    .pipe(dest("./archive"));
});

const watching = parallel(watchFiles, browserSync);

// exports.js = js;
// exports.css = css;
exports.default = parallel(img, scss, js, njk);
exports.watch = watching;
