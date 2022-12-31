
// // const gulp = require("gulp");
// const { src, dest,task} = require('gulp');
// const babel = require('gulp-babel');
// const sass = require("gulp-sass");
// const cssnano = require("gulp-cssnano");
// const rev = require("gulp-rev");
// const uglify = require("gulp-uglify-es").default;
// const imagemin = require("gulp-imagemin");
// const del = require("del");

// //Minified css
// task('css', function (done) {
//        src('./assests/scss/**/*.scss')
//       .pipe(sass())
//       .pipe(cssnano())
//       .pipe(dest('./assets.css'));

//        src('./assests/**/*.css')
//      // gulp.src('./assets.css/*.css')
//       .pipe(rev())
//       .pipe(dest('./public/assets'))
//       .pipe(rev.manifest({
//           cwd:"public",
//           merge:true
//         }))
//       .pipe(dest('./public/assets'))
//       done();
//   });

//   //Minified javascript
//   task('js', function (done) {
//     src('./assests/**/*.js')
//    .pipe(uglify())
//    .pipe(rev())
//    .pipe(dest('./public/assets'))
//    .pipe(rev.manifest({
//        cwd:"public",
//        merge:true
//      }))
//    .pipe(dest('./public/assets'))
//    done();
// });

// //Minified images
// task('images', function (done) {
//     src('./assets/**/*.(png|jpg|svg|gif|jpeg)')
//    .pipe(imagemin())
//    .pipe(rev())
//    .pipe(dest('./public/assets'))
//    .pipe(rev.manifest({
//        cwd:"public",
//        merge:true
//      }))
//    .pipe(dest('./public/assets'))
//    done();
// });

// //Whenever server will restart all old work done by gulp will be deleted and it will perform all the tasks and minificatin again
// task("clean:assets" , function(done){
//      del.sync("./public/assets");
//      done();
// });

// //Run all the taks one by one
// task("build" , gulp.series("clean:assets" , "css" , "js" , "images" , function(done){
//     done();
// }));

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');




gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assests/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{
        // cwd: 'public',
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/'))

    done()
});



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assests/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

     gulp.src('./assests/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{
        // cwd: 'public',
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/'));
    done();
});

gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assests/**/*.+(png|jpg|gif|svg|jpeg|ico)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});