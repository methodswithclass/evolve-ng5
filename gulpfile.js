var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer')
shell = require("gulp-shell"),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
del = require('del'),
inject = require('gulp-inject'),
filter = require("gulp-filter"),
merge = require("merge-stream"),
mainBowerFiles = require("gulp-main-bower-files"),
nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload');


// var middleware = require("./middleware/middleware.js");

const config = require("./config.js");


// var minify = process.env.NODE_ENV == "production";
var minify = false;

// var injectMin = process.env.NODE_ENV == "production";
var injectMin = false;


gulp.task("serve", ["build"], function () {

 	livereload.listen({port:config.livereloadPort})

	var stream = nodemon({ 
		script: './server.js',
		ext:"js html css json",
		watch:["./src", "./backend"],
		ignore:["./src/assets/css/classes_local.*"],
		tasks:["build"]
	});
	

	stream.on("restart", function () {

		setTimeout(function () {

			livereload.reload();

		}, 2000);

	})

	stream.on("crash", function () {
		
		stream.emit('restart', 10);
	})

	
})

gulp.task("build", ["clean"], function () {


	gulp.start("compile");
})


gulp.task('compile', ["js", "styles", "copy"], function () {


});


gulp.task("js", ["scripts"], function () {

	var important = gulp.src('dist/assets/js/vendor' + (minify && injectMin ? ".min" : "") + '.js', {read: false});
	var standard = gulp.src(["dist/assets/js/main" + (minify && injectMin ? ".min" : "") + ".js", 'dist/assets/**/*.css'], {read:false});

	return gulp.src('src/index.html')
	.pipe(inject(important, {ignorePath:"dist", starttag: '<!-- inject:head:{{ext}} -->'}))
	.pipe(inject(standard, {ignorePath:"dist"}))
	.pipe(gulp.dest('dist'));

})


gulp.task('scripts', ['vendor'], function() {


    var mainSrc = gulp.src([
        "node_modules/velocity-animate/velocity.js",
        "backend/evolve-app/__ga/**/*.js",
	    "src/assets/**/*.js",
	    "src/site-files/state/stateModule.js",
        "src/site-files/app/app.js",
	    "src/project-files/ga-apps/app-recognize/**/*.js",
	    "src/project-files/ga-apps/app-feedback/**/*.js",
	    "src/project-files/ga-apps/app-trash/**/*.js",
	    "src/**/*.js"
    ])
	.pipe(concat('main.js'))

    var main = mainSrc
	.pipe(gulp.dest("dist/assets/js"))

	var mainMin;

	if (minify) {
		mainMin = mainSrc
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
	}

	if (minify) {
		return merge(main, mainMin);
	}
	else {
		return main;
	}

});

gulp.task("vendor", function () {
	

	var bowerSrc = gulp.src("./bower.json")
		.pipe(mainBowerFiles({base:"./bower_components"}))
		.pipe(filter("**/*.js"))
		.pipe(concat("vendor.js"));


	var js = bowerSrc
	.pipe(gulp.dest("dist/assets/js"));

	var jsMin;

	if (minify) {
		jsMin = bowerSrc
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"));
	}

	// var css = gulp.src("./bower.json")
	// .pipe(mainBowerFiles())
	// .pipe(filter("**/*.css"))
	// .pipe(concat("vendor.css"))
	// .pipe(gulp.dest("dist/assets/css"));


	// if (minify) {
	// 	return merge(js, jsMin, css);
	// }
	// else {
	// 	return merge(js, css);
	// }

	return js;

});


gulp.task('styles', function() {


	// middleware.compileSass();


	var cssSrc = gulp.src('src/assets/css/**/*.css', { style: 'expanded' })
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));

	
	var css = cssSrc
	.pipe(concat("styles.css"))
	.pipe(gulp.dest('dist/assets/css'));

	return css;
});


gulp.task("html", function () {

	return gulp.src('src/assets/**/*.html')
	.pipe(gulp.dest("dist/assets/"))
});

gulp.task('images', function() {
	return gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('data', function() {
	return gulp.src('src/assets/data/kaggle/**/*.csv')
	.pipe(gulp.dest('dist/assets/data/kaggle'));
});

gulp.task('fonts', function () {

	return gulp.src("src/assets/css/**/*.*")
	.pipe(gulp.dest("dist/assets/css"))
});

gulp.task("root", function () {

	return gulp.src([ 
    "./favicon.ico"
    ]).pipe(gulp.dest("dist"));
})

gulp.task('misc', function() {
	return gulp.src([
	                'src/assets/config/**/*.*'
	                ])
	.pipe(gulp.dest('dist/assets/config'));
});



gulp.task("copy", ["data", "misc", "root", "html", "images", "fonts"], function () {


})

gulp.task('clean', function() {
	return del(['dist', "src/assets/scss"]);
});











