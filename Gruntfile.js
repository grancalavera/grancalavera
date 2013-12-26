/* global module:false */
/* jshint node:true */
'use strict';

module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  var commitMessage = function commitMessage () {
    return pkg.name + ' - v' +
      pkg.version + ' - ' +
      grunt.template.today('isoDateTime');
  };

  grunt.initConfig({

    pkg: pkg,

    styles_src: [
      'bower_components/normalize-css/normalize.css',
      // this one came with Jekyll
      'styles/syntax.css',
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
      jk_styles: {
        src: '<%= styles_src %>',
        dest: 'jekyll/css/main.css'
      },
      gh_styles: {
        src: '<%= styles_src %>',
        dest: 'gh-pages/css/main.css'
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
        files: ['gh-pages/**/*']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      styles: {
        files: 'styles/**/*.scss',
        tasks: ['compass', 'concat:gh_styles']
      }
    },

    compass: {
      main: {
        options: {
          sassDir: 'styles',
          cssDir: '.tmp/css'
        }
      }
    },

    shell: {
      jk_build: {
        options: {
          stdout: true
        },
        command: 'jekyll build'
      },
      gh_clone: {
        options: {
          stdout: true
        },
        command: 'git clone git@github.com:grancalavera/grancalavera.git gh-pages'
      },
      gh_checkout: {
        options: {
          stdout: true,
          execOptions: {
            cwd: 'gh-pages'
          }
        },
        command: [
          'git checkout --orphan gh-pages',
          'git rm -rf .'
        ].join('&&')
      },
      gh_push: {
        options: {
          stdout: true,
          execOptions: {
            cwd: 'gh-pages'
          }
        },
        command: [
          'git add -A',
          'git commit -m "' + commitMessage() + '"',
          'git push origin gh-pages'
        ].join('&&')
      }
    },

    clean: {
      gh_pages: ['gh-pages/*'],
      tmp: ['.sass-cache', '.tmp']
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('gh_init', [
    'clean:gh_pages',
    'shell:gh_clone',
    'shell:gh_checkout'
    ]);

  grunt.registerTask('build', [
    'clean:tmp',
    'compass',
    'concat:jk_styles',
    'shell:jk_build'
    ]);

  grunt.registerTask('deploy', [
    'jshint',
    'build',
    'shell:gh_push'
    ]);

  grunt.registerTask('default', [
    'jshint',
    'build',
    'watch'
    ]);

};
