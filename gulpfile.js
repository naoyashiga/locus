var gulp = require('gulp'), 
    $ = require('gulp-load-plugins')();

var browserify = require('browserify');
var babelify = require('babelify');
var source = require("vinyl-source-stream");

const autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: false
};

gulp.task('server', function() {
  gulp.src('./dist/')
    .pipe($.webserver({
      livereload: true,
      open: true,
      port: 9999
    }));
});

// gulp.task('browserify', function() {
//   browserify('./src/js/app.js', { debug: true })
//     .transform(babelify)
//     .bundle()
//     .on("error", function (err) { console.log("Error : " + err.message); })
//     .pipe(source("app.js"))
//     .pipe(gulp.dest('./dist/js'))
// });

gulp.task('copy', function() {
  return gulp.src(['./src/js/**/*.js'])
  .pipe(gulp.dest('./dist/js/'));
});


gulp.task('pug', function() {
  return gulp.src(['./src/pug/**/*.pug'])
  .pipe($.pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
  gulp.src('./src/sass/**/*.scss')
    .pipe($.sass({outputStyle: 'expanded'}))
    // .pipe($.autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./dist/css/'));
});

 gulp.task('watch', function() {
  // gulp.watch('src/js/**/*.js', ['browserify']);
  gulp.watch('src/js/**/*.js', ['copy']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/pug/**/*.pug', ['pug']);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      remoteUrl: "https://github.com/naoyashiga/locus"
    }));
});

  gulp.task('default', ['watch','server']);
