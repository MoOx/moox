module.exports = function(grunt) {

    // Imports
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    
    // set dev option to be true by default
    grunt.option('dev', typeof grunt.option('dev') !== 'undefined' ? grunt.option('dev') : true);

    // Project configuration.
    var happyPlan = grunt.file.readJSON('happy-plan.json');

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        happyPlan : happyPlan,
        
        warningComment: "DO NOT EDIT THIS GENERATED FILE, IT WILL BE OVERWRITTEN AUTOMATICALLY - REFER TO Gruntfile OR happy-plan/*",
        
        jshint: happyPlan.jshint,
        
        replace: {
            jekyll: {
                options: {
                    variables: {
                        __warningComment__: '# <%= warningComment %>',
                        dev: grunt.option('dev') ? 'true' : 'false',
                        version: '<%= pkg.version %>',
                        name: '<%= happyPlan.name %>',
                        url: '<%= happyPlan.url %>',
                        description: '<%= happyPlan.description %>',
                        permalink: '<%= happyPlan.jekyll.permalink %>',
                        baseurl: '<%= happyPlan.baseUrl %>'
                    }
                },
                files: { 'src/_config.yml': ['happy-plan/jekyll._config.yml'] }
            },
            compass: {
                options: {
                    variables: {
                        __warningComment__: '# <%= warningComment %>',
                        sass_dir: '<%= happyPlan.src.assets.styles %>',
                        css_dir: '<%= happyPlan.build.assets.styles %>',
                        images_dir: '<%= happyPlan.src.assets.images %>',
                        javascripts_dir: '<%= happyPlan.src.assets.scripts %>',
                        fonts_dir: '<%= happyPlan.src.assets.fonts %>',
                        http_path: '<%= happyPlan.baseUrl %>',
                        http_images_path: happyPlan.baseUrl + happyPlan.build.assets.images.replace(happyPlan.build._path, ''),
                        http_javascripts_path: happyPlan.baseUrl + happyPlan.build.assets.scripts.replace(happyPlan.build._path, ''),
                        http_fonts_path: happyPlan.baseUrl + happyPlan.build.assets.fonts.replace(happyPlan.build._path, ''),
                        require: happyPlan.compass.require.length>0 ? "require \"" + happyPlan.compass.require.join("\"\nrequire \"") + "\"" : "",
                        add_import_path: happyPlan.compass.add_import_path.length>0 ? "add_import_path \"" + happyPlan.compass.add_import_path.join("\"add_import_path \"") + "\"" : ""
                    }
                },
                files: { 'config.rb': ['happy-plan/compass.config.rb'] }
            }
        },

        clean: {
            build: {
                src: ['<%= happyPlan.build._path %>']
            },
            jekyll: {
                src: ['<%= happyPlan.build._path %>/_tmp']
            }
        },

        jekyll: {
            server : {
                baseurl:        '<%= happyPlan.baseUrl %>',
                src:            '<%= happyPlan.src._path %>',
                dest:           '<%= happyPlan.build._path %>',
                server:         true,
                server_port:    8000,
                auto:           false
            },
            build: {
                baseurl:        '<%= happyPlan.baseUrl %>',
                src:            '<%= happyPlan.src._path %>',
                dest:           '<%= happyPlan.build._path %>/_tmp',
                pygments:       true
            }
        },

        copy: {
            jekyllTmp: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.build._path %>/_tmp',
                        src: ['{**,.*}'],
                        dest: '<%= happyPlan.build._path %>'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.fonts %>',
                        src: ['**'],
                        dest: '<%= happyPlan.build.assets.fonts %>/' }
                ]
            },
            // to avoid imagemin when dev
            fakeImagemin: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.images %>/', 
                        src: ['**'],
                        dest: '<%= happyPlan.build.assets.images %>/'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.scripts %>/', 
                        src: ['**'],
                        dest: '<%= happyPlan.build.assets.scripts %>/'
                    }
                ]
            },
            components: {
                files: happyPlan.components.files
            }
        },

        webfont: {
            icons: {
                src: '<%= happyPlan.src.assets.webfonts %>/icons/*.svg',
                dest: '<%= happyPlan.build.assets.webfonts %>/icons',
                destCss: '<%= happyPlan.src.assets.styles %>',
                options: {
                    styles: 'icon',
                    stylesheet: 'scss',
                    hashes: false
                }
            }
        },

        compass: {
            dev: {
                options: {
                    outputStyle: 'expanded',
                    noLineComments: false,
                    debugInfo: true
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    noLineComments: true,
                    force: true
                }
            }
        },
        
        uglify: {
            dist: happyPlan.uglify
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [
                    // '<%= happyPlan.build.assets.images %>': '<%= happyPlan.src.assets.images %>/**/*',
                    // '<%= happyPlan.build.medias %>': '<%= happyPlan.build.medias %>/**/*'
                    {
                        "expand": true,
                        "cwd": "<%= happyPlan.src.assets.images %>",
                        "src": "**/*.{png,jpg,jpeg,gif,svg}",
                        "dest": "<%= happyPlan.build.assets.images %>"
                    }
                ]
            }
        },
        
        regarde: {
            configs: {
                files: ['happy-plan/**/*'],
                tasks: ['configs']
            },
            html: {
                files: [
                    '<%= happyPlan.src._path %>/**/*.{html,md,txt}',
                    '<%= happyPlan.src._path %>/_config.yml',
                    '<%= happyPlan.src._path %>/.htaccess'
                ],
                tasks: ['jekyll:build', 'copy:jekyllTmp', 'livereload']
            },
            js: {
                files: ['<%= happyPlan.src.assets.scripts %>/**/*'],
                tasks: ['jshint', 'copy:js']
            },
            scss: {
                files: ['<%= happyPlan.src.assets.styles %>/**/*'],
                tasks: ['compass:dev']
            },
            images: {
                files: ['<%= happyPlan.src.assets.images %>/**/*'],
                tasks: ['copy:fakeImagemin']
            },
            fonts: {
                files: ['<%= happyPlan.src.assets.fonts %>/**/*'],
                tasks: ['copy:fonts']
            },
            webfonts: {
                files: ['<%= happyPlan.src.assets.webfonts %>/icons/*.svg'],
                tasks: 'webfont:icons'
            },
            livereload: {
                files: ['<%= happyPlan.build.assets._path %>/**'],
                tasks: 'livereload'
            }
        }
    });

    grunt.registerTask('default', ['dev', 'livereload-start', 'regarde']);

    grunt.registerTask('configs', ['replace:compass', 'replace:jekyll']);
    
    grunt.registerTask('build', ['configs', 'jekyll:build', 'copy:jekyllTmp', 'copy:fonts', 'copy:components', 'webfont:icons']);
    grunt.registerTask('dev', ['jshint', 'build', 'compass:dev', 'copy:js', 'copy:fakeImagemin']);
    grunt.registerTask('dist', ['jshint', 'clean:build', 'build', 'clean:jekyll', 'compass:dist', 'uglify', 'imagemin:dist']);
    
    grunt.registerTask('test', ['dist']);

    grunt.registerTask('server', 'jekyll:server');
};
