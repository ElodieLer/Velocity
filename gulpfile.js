// Requis
var gulp = require('gulp');
var concat = require('gulp-concat');
// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify-es').default;
// Variables de chemins
var source = './app/src'; // dossier de travail
var destination = './app/dist'; // dossier à livrer

gulp.task('sass', function () {
    return gulp.src(source + '/assets/sass/style.scss')
        .pipe(plugins.sass())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(destination + '/assets/css/'))
        .pipe(browserSync.stream());
});
// concat
gulp.task('concat', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(destination + '/assets/js/'));
});


// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
    return gulp.src(destination + '/assets/css/*.css')
      .pipe(plugins.csso())
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(destination + '/assets/css/'));
  });


  // Tâche "build"
  gulp.task('build', ['sass' , 'uglifyjs']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche par défaut
gulp.task('default', ['build']);


// Tâche "watch" = je surveille *scss
// gulp.task('watch', function () {
//     gulp.watch(source + '/assets/sass/*.scss', ['build']);
//   });

gulp.task("uglifyjs", function () {
  return gulp.src(`${source}/assets/js/*.js`)
      .pipe(plugins.rename("app.min.js"))
      .pipe(uglify(/* options */))
      .pipe(gulp.dest(`${destination}/assets/js/`))
      .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'concat'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(source + "/assets/sass/*.scss", ['sass']);
    gulp.watch(`${source}/assets/js/*.js`, ['concat']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});