/* global module:false */
/* jshint node:true */
'use strict';

module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  var commitMessage = function commitMessage () {
    return pkg.name + ' ' +
      pkg.version + ' ' +
      grunt.template.date(Date.now(), 'yyyy-mm-dd');
  };

  grunt.initConfig({

    pkg: pkg,

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

    shell: {
      jekyll: {
        options: {
          stdout: true
        },
        command: 'jekyll build'
      },
      gh_clone: {
        options: {
          stdout: true
        },
        command: 'git clone git@github.com:grancalavera/grancalavera.git _site'
      },
      gh_checkout: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '_site'
          }
        },
        command: [
          'git checkout --orphan gh-pages',
          'git rm -rf .',
          'rm .gitignore'
        ].join('&&')
      },
      gh_push: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '_site'
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
      site: ['_site'],
      tmp: ['.sass-cache', '.tmp']
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('gh_init', [
    'clean:site',
    'shell:gh_clone',
    'shell:gh_checkout'
    ]);

  grunt.registerTask('build', [
    'clean:tmp',
    'compass',
    'concat',
    'shell:jekyll'
    ]);

  grunt.registerTask('deploy', [
    'jshint',
    'gh_init',
    'build',
    'shell:gh_push'
    ]);

  grunt.registerTask('default', [
    'jshint',
    'build',
    'watch'
    ]);

};
