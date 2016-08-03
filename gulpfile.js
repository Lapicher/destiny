// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat= require('gulp-concat');
var browserify= require('browserify');
var tap=require('gulp-tap');
var buffer=require('gulp-buffer');
var uglify=require('gulp-uglify');
var sourcemaps=require('gulp-sourcemaps');
var postcss=require('gulp-postcss');
var autoprefixer=require('autoprefixer');
var cssnano=require('cssnano');
var imagemin=require('gulp-imagemin');
//var spritesmith= require('gulp.spritesmith'); // no la use.

//variables de patrones de archivos
var jsFiles=["src/js/*.js","src/js/**/*.js"];
var uploadedImages= ["uploads/*.png","uploads/*.jpg","uploads/*.gif","uploads/*.svg"];
var assetsImages =["src/img/*.png","src/img/*.jpg","src/img/*.gif","src/img/*.svg"];

// definimos tarea por defecto
gulp.task("default", ["concat-js","assets-images-optimization","compile-sass"], function(){

    // iniciar BrowserSync
    browserSync.init({
        //server: "./", // levanta servidor web en carpeta actual
        proxy: '127.0.0.1:8000',
        browser: "google chrome" //firefox , opera, google chrome
    });

    // observa cambios en archivos SASS y ejecuta la tarea de compilación
    gulp.watch("src/scss/*.scss", ["compile-sass"]);

    // observa cambios en archivos HTML y recargue el navegador
    gulp.watch("*.html").on("change", browserSync.reload);

    //observar cambios en archivos JS
    gulp.watch(jsFiles,["concat-js"]);

    //observar cambios en archivos de imagen de src
    //gulp.watch(assetsImages,[])
});

// definimos la tarea para compilar SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // cargamos le archivo
    .pipe(sourcemaps.init()) //comenzamos la captura de sourcemaps
    .pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS

    .pipe(postcss([
      autoprefixer(), // autoprefija automaticamente el css
      cssnano() //minifica el CSS.
    ]))
    .pipe(sourcemaps.write('./')) //escribimos los sourcemaps.
    .pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
    .pipe(notify({
        title: "SASS",
        message: "Compiled"
    }))
    .pipe(browserSync.stream());
});

//definimos la tarea para concatenar JS
gulp.task("concat-js",function(){
    gulp.src("src/js/app.js")
    .pipe(sourcemaps.init()) // comenzamos la captura de sourcemaps.
    .pipe(tap(function(file){
        file.contents=browserify(file.path).bundle(); //pasamos el archivo por broserify para importar los require.
    }))// tap nos permite ejecutar un codigo por cada fichero seleccionado en el paso anterior
    .pipe(buffer())// converir cada archivo en un stream.
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // escribimos los sourcemaps.
    .pipe(gulp.dest("dist/js/"))
    .pipe(notify({
        title: "JS",
        message: "Concatenado"
    }))
    .pipe(browserSync.stream());
});

//optimizacion de imagenes de usuario. imagenes de contenido.
gulp.task("uplouded-image-optimization",function(){

});

// optimizacion de assets. imagenes del sitio en general.
gulp.task("assets-images-optimization",function(){
    gulp.src(assetsImages)
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img/"));
});
/*
// optimizacion de imagenes, hacienola minificada y sprite para solo una peticion http.
gulp.task("sprite",function(){
    var spriteData= gulp.src('./src/img/*')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../img/sprite.png'
    }));

    spriteData.img.pipe(buffer()).pipe(imagemin()).pipe(gulp.dest('./dist/img/'));
    spriteData.css.pipe(gulp.dest('./src/scss/'));
});
*/
