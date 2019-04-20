module.exports = function( grunt ) {
	grunt.initConfig({
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
				cwd: 'src',
				src: '**',
				dest: 'dist/'
			},
		},
		strip_code: {
			options: {
				blocks: [
					{
						start_block: "/* test-code */",
						end_block: "/* end-test-code */"
					}
				]
			},
			your_target: {
				src: 'dist/js/*.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-strip-code');
	grunt.registerTask('default', ['qunit']);
	grunt.registerTask('deploy', ['qunit', 'copy', 'strip_code']);
};
