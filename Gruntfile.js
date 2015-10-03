/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt` or `sails lift`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */

module.exports = function(grunt) {

	var includeAll;

	try {
		includeAll = require('include-all');
	} catch (e0) {
		try {
			includeAll = require('sails/node_modules/include-all')
		} catch (e1) {
      		console.log("Can not find module include-all");
      		grunt.registerTask('default', []); 
    	}
	}
	/**
	 * Loads Grunt configuration modules from the specified
	 * relative path. These modules should export a function
	 * that, when run, should either load/configure or register
	 * a Grunt task.
	 */
	function loadTasks(relPath) {
		return includeAll({
			dirname: require('path').resolve(__dirname, relPath),
			filter: /(.+)\.js$/
		}) || {};
	}

	/**
	 * Invokes the function from a Grunt configuration module with
	 * a single argument - the `grunt` object.
	 */
	function invokeConfigFn(tasks) {
		for (var taskName in tasks) {
			if (tasks.hasOwnProperty(taskName)) {
				tasks[taskName](grunt);
			}
		}
	}




	// Load task functions
	var taskConfigurations = loadTasks('./tasks/config'),
		registerDefinitions = loadTasks('./tasks/register');

	// (ensure that a default task exists)
	if (!registerDefinitions.default) {
		registerDefinitions.default = function (grunt) { grunt.registerTask('default', []); };
	}

	// Run task functions to configure Grunt.
	invokeConfigFn(taskConfigurations);
	invokeConfigFn(registerDefinitions);
	
	// grunt.initConfig({
	// 	less: {
	// 		development: {
	// 			options: {
	// 				paths: "assets/styles/css"
	// 			},
	// 			files: {
	// 				'.tmp/public/styles/css/common.css': 'assets/styles/importer.less'
	// 			}
	// 		}

	// 	},
	// 	watch: {
	// 		css: {
	// 			files: 'assets/styles/importer.less',
	// 			tasks: ['less']
	// 		},
	// 		scripts: {
	// 			files: 'assets/app/**/.*js'
	// 		}
	// 	},
	// 	clean: {
	// 		build:{
	// 			src: [".tmp/public/"]
	// 		}
	// 	},
	// 	copy: {
	// 		main:{
	// 			files: [{
	// 				expand: true,
	// 				src: 'assets/app/**/*.js',
	// 				dest: '.tmp/public/js'
	// 			}]
	// 		}
			
	// 	}

	// });

	// //grunt.loadNpmTasks("grunt-contrib-stylus");
	// grunt.loadNpmTasks("grunt-contrib-watch");
	// grunt.loadNpmTasks("grunt-contrib-less");
	// grunt.loadNpmTasks("grunt-contrib-copy");
	// grunt.loadNpmTasks("grunt-contrib-clean");

	// grunt.registerTask('build', ['clean', 'less', 'copy', 'watch']);
	// grunt.registerTask('default', ['clean', 'less', 'copy', 'linkAssets', 'watch']);
};