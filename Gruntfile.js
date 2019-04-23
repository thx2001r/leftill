var pkgJson = require('./package.json');

module.exports = function( grunt ) {
	grunt.initConfig({
		banner: [
			'/*-------------------------------------------------------------------------+',
			'|   _       __ _   _ _ _                                                   |',
			'|  | | ___ / _| |_(_) | |                                                  |',
			'|  | |/ _ \\ |_| __| | | |                                                  |',
			'|  | |  __/  _| |_| | | |    v' + pkgJson.version + '                                        |',
			'|  |_|\\___|_|  \\__|_|_|_|    https://github.com/thx2001r/leftill           |',
			'|                                                                          |',
			'+--------------------------------------------------------------------------+',
			'|  Copyright (c) 2019 Joseph Reiter                                        |',
			'|  https://github.com/thx2001r/leftill/blob/master/LICENSE                 |',
			'+-------------------------------------------------------------------------*/'
		].join('\n'),

		qunit: {
			all: ['tests/*.html']
		},
		watch: {
			files: ['tests/*.js', 'src/js/*.js'],
			tasks: ['qunit']
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src/js',
				src: '**',
				dest: 'dist/js'
			},
		},
		strip_code: {
			options: {
				blocks: [
					{
						start_block: "/* BEGIN: Test-Only Code to Strip During Deployment */",
						end_block: "/* END: Test-Only Code to Strip During Deployment */"
					}
				]
			},
			your_target: {
				src: 'dist/js/*.js'
			}
		},
		uglify: {
			my_target: {
				files: [
					{
						expand: true,
						src: ['dist/js/*.js', '!dist/js/*.min.js'],
						dest: '.',
						cwd: '.',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		concat: {
			js: {
				files: {
					'dist/js/leftill.js': ['dist/js/leftill.js', 'src/3rdParty/js/3rdParty.min.js'],
					'dist/js/leftill.min.js': ['dist/js/leftill.min.js', 'src/3rdParty/js/3rdParty.min.js']
				}
			}
		},
		usebanner: {
			taskName: {
				options: {
					position: 'top',
					banner: '<%= banner %>\n',
					linebreak: true
				},
				files: {
					src: ['dist/js/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-strip-code');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['qunit']);
	grunt.registerTask('deploy', ['qunit', 'copy', 'strip_code', 'uglify', 'concat', 'usebanner']);
};