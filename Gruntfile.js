/*global module:false, define:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        node : true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js', '!src/lib/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    },
    connect: {
      test: {
        port: 8000,
        base: '.'
      }
    },
    jasmine: {
      requirejs: {
        src: 'test/fixtures/requirejs/src/**/*.js',
        options: {
          specs: 'test/fixtures/requirejs/spec/*Spec.js',
          helpers: 'test/fixtures/requirejs/spec/*Helper.js',
          host: 'http://127.0.0.1:<%= connect.test.port %>/',
          template: require('./'),
          templateOptions: {
            requireConfigFile: 'test/fixtures/requirejs/src/main.js',
            requireConfig : {
              baseUrl: './test/fixtures/requirejs/src/',
              config: {
                sum: {
                  description: "Sum module (overridden)"
                }
              },
              "shim": {
                "fakeShim": {
                  "exports": 'fakeShim',
                  "init": function () {
                    return "this is fake shim";
                  }
                }
              },
              "callback": function() {
                define('inlineModule', function() {
                  return 'this is inline module';
                });
              }
            }
          }
        }
      },
      'require-baseurl': {
        src: 'test/fixtures/require-baseurl/src/**/*.js',
        options: {
          specs: 'test/fixtures/require-baseurl/spec/**/*Spec.js',
          template: require('./'),
          templateOptions: {
            requireConfig: {
              baseUrl: 'test/fixtures/require-baseurl/src/'
            }
          }
        }
      },
      'require-nobaseurl': {
        src: 'test/fixtures/require-nobaseurl/src/**/*.js',
        options: {
          specs: 'test/fixtures/require-nobaseurl/spec/**/*Spec.js',
          template: require('./')
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect', 'jasmine']);

  // Default task.
  grunt.registerTask('default', ['jshint','test']);

};
