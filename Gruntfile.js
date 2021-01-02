module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: [
      '/* ------------------------------------------------------------------------+',
      '|   _       __ _   _ _ _                                                   |',
      '|  | | ___ / _| |_(_) | |                                                  |',
      '|  | |/ _ \\ |_| __| | | |                                                  |',
      '|  | |  __/  _| |_| | | |    v<%= pkg.version %>                                        |',
      '|  |_|\\___|_|  \\__|_|_|_|    https://github.com/thx2001r/leftill           |',
      '|                                                                          |',
      '+--------------------------------------------------------------------------+',
      '|  Copyright (c) ' + new Date().getFullYear() + ' Joseph Reiter                                        |',
      '|  https://github.com/thx2001r/leftill/blob/master/LICENSE                 |',
      '+------------------------------------------------------------------------ */'
    ].join('\n'),
    eslint: {
      target: 'src/js'
    },
    run: {
      jest: {
        exec: 'npm run test'
      },
      watch: {
        exec: 'npm run watch'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/js',
        src: '**',
        dest: 'dist/js'
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
              return dst + '/' + src.replace('.js', '.min.js')
            }
          }
        ]
      }
    },
    clean: ['dist'],
    usebanner: {
      all: {
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
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-banner')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-run')

  grunt.registerTask('default', ['eslint', 'run:jest'])
  grunt.registerTask('build', ['eslint', 'run:jest', 'clean', 'copy', 'uglify', 'usebanner'])
}
