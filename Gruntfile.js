/* global module:false */
/* jshint node:true */
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    styles_src: [
      'bower_components/normalize-css/normalize.css',
      // this one came with Jekyll
      'css/syntax.css',
      '.tmp/css/*.css'
    ],

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' <%= pkg.license %> License */\n',

    concat: {
      options: {
        banner: '<%= banner %>',
      },
      sass_dev: {
        src: '<%= styles_src %>',
        dest: '_site/css/main.css'
      },
      sass_prod: {
        src: '<%= styles_src %>',
        dest: 'css/main.css'
      }
    },

    jshint: {
      options: {
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
      }

    },

    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: ['_site/*']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['compass', 'concat:sass_dev']
      }
    },

    compass: {
      site: {
        options: {
          sassDir: 'sass',
          cssDir: '.tmp/css'
        }
      }
    },

    clean: ['_site/css']

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['clean', 'jshint', 'compass', 'concat']);
  grunt.registerTask('default', ['build', 'watch']);

};
