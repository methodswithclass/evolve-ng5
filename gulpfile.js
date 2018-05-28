var gulp = require('gulp'),
del = require('del'),
nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload'),
exec = require("gulp-exec");


const config = require("./config.js");


const clean = () => {
	// console.log("\nclean\n\n");
	return del(['dist', "src/assets/scss"]);
}



const build = () => {

	// console.log("\nbuild\n\n");
	return gulp.src("./")
	.pipe(exec("ng build"));

	// gulp.start("compile");
}

gulp.task("build", build);

const compile = gulp.series(clean, build);

const startWatchServer = () => {

	// console.log("\nserve\n\n");

	livereload.listen({port:config.livereloadPort})

	var stream = nodemon({
		script: './server.js',
		ext:"js ts html css scss json",
		watch:["./src", "./backend"],
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


}


var serve = gulp.series(compile, startWatchServer);


gulp.task("serve", serve);




