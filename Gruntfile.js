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
          'css/<%= pkg.name %>.css': ['css/style.less']
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
    uglify: {
      options: {
        banner: ''
      },
      dist: {
        src: [
          'lib/leaflet-hash.js',
          'lib/leaflet-pip.js',
          'lib/Control.Layers.Custom.js',
          'lib/Control.Zoom.Center.js',
          'js/bundle.js'
        ],
        dest: 'js/bundle.min.js'
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ''
      },
      js: {
        src: [
          'lib/jquery/jquery-1.10.2.min.js',
          'lib/jquery/jquery-ui-1.10.4.custom.min.js',
          'lib/jquery.ui.touch-punch.min.js',
          'lib/es5-shim.min.js',
          'lib/analytics.js',
          'js/bundle.min.js'
        ],
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
        files: ['js/bundle.js'],
        tasks: ['bump', 'uglify', 'concat', 'assemble']
      },
      browserify: {
        files: ['js/*.js', '!js/bundle.js', '!js/bundle.min.js'],
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

  grunt.registerTask('default', ['bump', 'less', 'browserify', 'uglify', 'concat', 'assemble', 'watch']);

};
