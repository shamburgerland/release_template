module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // load time-grunt and all grunt plugins found in the package.json
    require('time-grunt')(grunt);  
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        
        less: {
            dist: {
                files: {
                    'assets/css/style.min.css': [ //Automatically convert less to css
                    'assets/less/style.less' //Original files
                    ]
                },
                options: {
                    compress: true, //Minify css
                }
            }
        },    
        imagemin: {
            dynamic: {
            files: [{
                expand: true,
                cwd: 'assets/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '_site/assets/img/'
            }]
            }
        },
        jshint: {
            options: {
                bitwise: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                esnext: true,
                immed: true,
                jquery: true,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                strict: false,
                trailing: false
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                'assets/js/custom/*.js',
                '!assets/js/scripts.min.js'
            ]
        },
        
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [ //Automatically combine and min all js to this single file
                    'assets/js/custom/*.js',
                    'assets/js/vendor/*.js',
                    'assets/js/bootstrap/3.3.2/*.js',
                    'assets/js/_*.js'
                    ]
                }
            }
        },
    
        watch: {
            less: {
                files: [
                    'assets/less/style.less',
                    'assets/less/custom/*.less'
                ],
                tasks: ['less']
            },
            imagemin: {
                files: [
                    'assets/img/*',
                    'assets/img/**/*'
                ],
                tasks: ['imagemin'] 
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'uglify']
            },
            options: {
                livereload: true,
            },
            files: [
                '*.html', 
                '_includes/*.html', 
                '_layouts/*.html', 
                '_data/*',
                '_data/releases/*',
                '_config.yml',
                '*.md',
                'assets/css/*.css',
                'assets/js/*.js',
                'assets/js/custom/*.js', 
                'assets/js/vendor/*.js',
                //'.htaccess'
            ],
            tasks: ['jekyll']
        },
                    
        jekyll: {
            options: {                          
                src: './'
            },
            dist: {
                options: {
                    dest: './_site',
                    config: '_config.yml'
                }
            }
        },
        
        connect: { // Run command line: grunt serve
            server: { // Once run, any files under "watch" (see code above) will automatic compile and output files in _site folder
                options: { 
                    port: 8000, // Define your port if you have multpile ports running
                    hostname: 'localhost', // View site at http://localhost:8000
                    base: '_site' // Compile and output all files in this location
                }
            }
        }
        
    });
  
    // register custom grunt tasks
    grunt.registerTask('default', ['less', 'uglify', 'imagemin', 'jekyll']);
    grunt.registerTask('serve', ['connect', 'watch']);
};