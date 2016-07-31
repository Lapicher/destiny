// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat= require('gulp-concat');
var browserify= require('browserify');
var tap=require('gulp-tap');
var buffer=require('gulp-buffer');

//variables de patrones de archivos
var jsFiles=["src/js/*.js","src/js/**/*.js"];

// definimos tarea por defecto
gulp.task("default", ["concat-js","compile-sass"], function(){

    // iniciar BrowserSync
    browserSync.init({
        //server: "./", // levanta servidor web en carpeta actual
        proxy: '127.0.0.1:8000',
        browser: "google chrome"
    });

    // observa cambios en archivos SASS y ejecuta la tarea de compilación
    gulp.watch("src/scss/*.scss", ["compile-sass"]);

    // observa cambios en archivos HTML y recargue el navegador
    gulp.watch("*.html").on("change", browserSync.reload);

    //observar cambios en archivos JS
    gulp.watch(jsFiles,["concat-js"]);
});

// definimos la tarea para compilar SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // cargamos le archivo
    .pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS
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
    .pipe(tap(function(file){
        file.contents=browserify(file.path).bundle(); //pasamos el archivo por broserify para importar los require.
    }))// tap nos permite ejecutar un codigo por cada fichero seleccionado en el paso anterior
    .pipe(buffer())// converir cada archivo en un stream.
    .pipe(gulp.dest("dist/js/"))
    .pipe(notify({
        title: "JS",
        message: "Concatenado"
    }))
    .pipe(browserSync.stream());
});
