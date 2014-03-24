module.exports = function(grunt) {

    // All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'assets/css/global.css': 'dev-assets/scss/global.scss',
                }
            }
        },
        concat: {
            helpers: {
                src: ['dev-assets/js/helpers/*.js'],
                dest: 'dev-assets/js/helpers.js'
            },
            plugins: {
                src: ['dev-assets/js/plugins/jquery.nivo.slider.pack.js'],
                dest: 'dev-assets/js/plugins.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'assets/js/production.min.js': ['dev-assets/js/script.js'],
                    'assets/js/plugins.min.js': ['dev-assets/js/plugins.js'],
                    'assets/js/helpers.min.js': ['dev-assets/js/helpers.js']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dev-assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/'
                }]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev-assets/img',
                    src: ['**/*.svg'],
                    dest: 'assets/img/',
                    ext: '.svg'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['dev-assets/js/*.js', 'dev-assets/img/*.{png,jpg,gif,svg}', 'dev-assets/scss/*.scss'],
                tasks: ['sass', 'concat', 'uglify', 'imagemin', 'svgmin'],
                options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
            } 
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'imagemin', 'svgmin']);

};