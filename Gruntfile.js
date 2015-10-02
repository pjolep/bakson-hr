
var path = require('path');
var server1 = require('./express.js');

module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

        copy: {
            build: {
                cwd: 'app',
                src: [ '**' ],
                dest: 'dist',
                expand: true
            },
            dist:{
                files:[{
                    cwd: '',
                    src: 'express.js',
                    dest: 'dist',
                    expand: true
                }]
            }
        },

        clean: {
            build: {
                src: [ 'build' ]
            }
        },

        express: {
            default_option: {
                myServer : {
                    server : server1
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/stylesheets/layoutComponents/test.css':'dist/stylesheets/**/*.scss'
                }
            }
        },

        autoprefixer : {
            dist : {
                options: {
                    map : true
                },
                files : {
                    'dist/stylesheets/layoutComponents/*.css':'dist/stylesheets/layoutComponents/**/*.scss'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/app.js': ['dist/app.js']
                }
            }
        },

        watch: {
            css: {
                files: 'dist/stylesheets/layoutComponents/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options : {
                    spawn : false
                }
            }
        },

        serve : {
            options : {
                port : 9000
            }
        }

    });

    // load the tasks
    //grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-autoprefixer');
    //grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-pm2-deploy');

    //grunt.registerTask('default', ['express', 'express-keepalive']);
    //grunt.registerTask('default',['express', 'express-keepalive']);
    grunt.registerTask('default',['watch', 'sass', 'autoprefixer', 'express', 'express-keepalive']);

};


