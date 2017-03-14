/*
 *  date		- 20170313
 *  author	- jr
 *
 * */

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Project configuration
		pkg: grunt.file.readJSON('package.json'),

		// Sass complies into Css
		sass:{
			dist:{
				options:{
					sourcemap:'auto',
					style:'expanded'
				//	sourceMap:true,
				//	outputStyle:'expanded'   // Values:nested, expanded, compact, compressed
				},
				files:[{
				    expand:true,
				    cwd:'asset/sass/',
					src:['**/*.scss'],
					dest:'asset/css/',
					ext:'.css'
			  }]
		    },
		},

	    // Cssmin
	    cssmin: {
			 options: {
				 sourceMap: true,
				 shorthandCompacting: false,
				 roundingPrecision: -1
			 },
			 target: {
				 files: {
					 'asset/css/style.min.css': ['asset/css/style.css'],
				 },
			/*files: [{
			      expand: true,
			      cwd: 'asset/css/',
			      src: ['*.css', '!*.min.css'],
			      dest: 'asset/css/',
			      ext: '.min.css'
			    }]*/
			 }
	    },

		uglify: {
		   my_target: {
			 files: {
			   'asset/js/script.min.js': ['asset/js/script.js']
			 }
		   }
	   },

	    // Cache breaker
	    cachebreaker: {
	    	md5: {
	    		options: {
                    replacement: "md5",
                    match: [
                            {
                             	'style.min.css': 'asset/css/style.min.css',
                             	'style.css': 'asset/css/style.css',
                            	'script.min.js': 'asset/js/script.min.js',
                            	'script.js': 'asset/js/script.js',
                            }
                        ]
                },
	            files: {
	                	src:['public/*.html']
	            }
	        }
	    },

		// Watch and build
	    watch: {
			options:{
	        	spawn:false,
				livereload:true,
			},
	      	css: {
	        	files: ['asset/sass/**/*.scss'],
	        	tasks: ['sass','cssmin'],
		    },
			html:{
				files:['public/**/*.html'],
				// options:{
				// 	livereload:true,
				// },
			},
			js:{
				files:['asset/js/script.js','asset/js/script.min.js'],
				// options:{
				// 	livereload:true,
				// },
			}
	    },

	});

	// Default task(s)
	grunt.registerTask('default', [
	                                'sass',
	                                'cssmin',
									'uglify',
	                               // 'cachebreaker',
	                               //'watch'
    ]);

};
