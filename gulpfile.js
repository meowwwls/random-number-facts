const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');

const reload = browserSync.reload;
const babel = require('gulp-babel');
const prefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('clean', () => del(['dist/**', '!dist'], { force: true }));

gulp.task('css', () =>
  gulp
    .src('src/**/*.css')
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
);

gulp.task('js', () =>
  gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
);

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('dist/index.html', reload);
});

gulp.task('default', ['browserSync', 'js', 'css', 'watch']);
gulp.task('build', ['js', 'css']);
