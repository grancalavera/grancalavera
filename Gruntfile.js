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

    scripts_src: [
      'bower_components/jquery/jquery.js',
      'scripts/comments.js'
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
      jekyll: {
        files: {
          'jekyll/css/main.css': '<%= styles_src %>',
          'jekyll/js/main.js': '<%= scripts_src %>'
        }
      },
      gh_pages: {
        files: {
          'gh-pages/css/main.css': '<%= styles_src %>',
          'gh-pages/js/main.js': '<%= scripts_src %>'
        }
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
        browser: true,
        asi: true,
        globals: {
          console: false,
          $: false,
        }
      },

      gruntfile: {
        src: 'Gruntfile.js'
      },

      scripts: {
        src: 'scripts/**/*.js'
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
        tasks: ['compass', 'concat:gh_pages']
      },
      scripts: {
        files: 'scripts/**/*.js',
        tasks: ['jshint:scripts', 'concat:gh_pages']
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
      jk_detach: {
        options: {
          stdout: true
        },
        command: 'jekyll serve -w --detach'
      },
      jk_build: {
        options: {
          stdout: true
        },
        command: 'jekyll build'
      },
      jk_build_production: {
        options: {
          stdout: true
        },
        command: 'jekyll build --config _config.yml,deploy.yml'
      },
      gh_clone: {
        options: {
          stdout: true
        },
        command: 'git clone git@github.com:grancalavera/grancalavera.git gh-pages'
      },
      gh_init: {
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
      gh_checkout: {
        options: {
          stdout: true,
          execOptions: {
            cwd: 'gh-pages'
          }
        },
        command: 'git checkout gh-pages'
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
      gh_pages_dir: 'gh-pages',
      gh_pages: 'gh-pages/*',
      tmp: ['.sass-cache', '.tmp']
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('gh_init', [
    'clean:gh_pages_dir',
    'shell:gh_clone',
    'shell:gh_init'
    ]);

  grunt.registerTask('gh_reset', [
    'clean:gh_pages_dir',
    'shell:gh_clone',
    'shell:gh_checkout'
    ]);

  grunt.registerTask('build', [
    'clean:tmp',
    'compass',
    'concat:jekyll',
    'shell:jk_build'
    ]);

  grunt.registerTask('build:production', [
    'clean:tmp',
    'compass',
    'concat:jekyll',
    'shell:jk_build_production'
    ]);

  grunt.registerTask('deploy', [
    'jshint',
    'build:production',
    'shell:gh_push'
    ]);

  grunt.registerTask('default', [
    'jshint',
    'build',
    'watch'
    ]);

};