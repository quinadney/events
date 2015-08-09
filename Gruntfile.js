// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    imagemin: {
      dynamic: {                         // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'public/',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: 'dist/'                  // Destination path prefix 
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/stylesheets',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/js/output.min.js': ['public/javascripts/angularApp.js']
        }
      }
    },

    uncss: {
      dist: {
        files: {
          'dist/css/tidy.css': ['views/index.html', 'public/templates/blog.html', 'public/templates/home.html', 'public/templates/submissions.html', ]
        }
      }
    },

    sass: {
      dist: {
        files: {
          'public/stylesheets/main.css': 'public/stylesheets/main.scss'
        }
      }
    }
  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-uncss');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['nodemon']);  

};
