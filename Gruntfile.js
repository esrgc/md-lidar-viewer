/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: false,
        createTag: false,
        push: false
      }
    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %> */\n',
    less: {
      dist: {
        files: {
          'css/<%= pkg.name %>.css': 'css/style.less'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'js/bundle.js': ['js/main.js']
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';'
      },
      js: {
        src: [
          'lib/jquery/jquery-1.10.2.min.js',
          //'lib/bootstrap-3.0.1/js/bootstrap.min.js',
          'lib/*.js',
          'js/bundle.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.js.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    assemble: {
      index: {
        options: {
          pkg: '<%= pkg %>'
        },
        files: {
          'index.html': ['templates/index.tmpl' ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= concat.js.src %>'],
        tasks: ['bump', 'concat', 'uglify', 'assemble']
      },
      browserify: {
        files: ['js/*.js', '!js/bundle.js'],
        tasks: ['browserify']
      },
      css: {
        files: 'css/*.less',
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['bump', 'less', 'browserify', 'concat', 'uglify', 'assemble']);

};
