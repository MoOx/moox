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
        
        warningComment: "DO NOT EDIT THIS GENERATED FILE, IT WILL BE OVERWRITTEN AUTOMATICALLY - REFER TO Gruntfile OR configs/*",
        
        jshint: happyPlan.grunt.jshint,
        
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
                        baseurls_scripts: '<%= happyPlan.baseUrls.scripts %>',
                        baseurls_styles: '<%= happyPlan.baseUrls.styles %>',
                        baseurls_images: '<%= happyPlan.baseUrls.images %>',
                        baseurls_fonts: '<%= happyPlan.baseUrls.fonts %>',
                        baseurl: '<%= happyPlan.baseUrl %>'
                    }
                },
                files: { '<%= happyPlan.paths.src.jekyll %>/_config.yml': ['<%= happyPlan.paths.configs.jekyll %>'] }
            },
            compass: {
                options: {
                    variables: {
                        __warningComment__: '# <%= warningComment %>',
                        sass_dir: '<%= happyPlan.paths.src.styles %>',
                        css_dir: '<%= happyPlan.paths.build.styles %>',
                        images_dir: '<%= happyPlan.paths.src.images %>',
                        javascripts_dir: '<%= happyPlan.paths.src.scripts %>',
                        fonts_dir: '<%= happyPlan.paths.src.fonts %>',
                        http_path: '<%= happyPlan.baseUrl %>',
                        http_images_path: happyPlan.baseUrls.images,
                        http_javascripts_path: happyPlan.baseUrls.scripts,
                        http_fonts_path: happyPlan.baseUrls.fonts,
                        require: happyPlan.compass.require.length>0 ? "require \"" + happyPlan.compass.require.join("\"\nrequire \"") + "\"" : "",
                        additional_import_paths: happyPlan.compass.additional_import_paths ? ("additional_import_paths = [" + (happyPlan.compass.additional_import_paths.length>0 ? ("\n    \"" + happyPlan.compass.additional_import_paths.join("\",\n    \"") + "\"\n]") : "]")) : ''
                    }
                },
                files: { 'config.rb': ['<%= happyPlan.paths.configs.compass %>'] }
            }
        },

        clean: {
            build: {
                src: ['<%= happyPlan.paths.build._ %>']
            },
            jekyll: {
                src: ['<%= happyPlan.paths.build._ %>/_tmp']
            }
        },

        jekyll: {
            server : {
                baseurl:        '<%= happyPlan.baseUrl %>',
                src:            '<%= happyPlan.paths.src.jekyll %>',
                dest:           '<%= happyPlan.paths.build.jekyll %>',
                server:         true,
                server_port:    8000,
                auto:           false
            },
            build: {
                baseurl:        '<%= happyPlan.baseUrl %>',
                src:            '<%= happyPlan.paths.src.jekyll %>',
                dest:           '<%= happyPlan.paths.build.jekyll %>/_tmp',
                pygments:       true
            }
        },

        copy: {
            jekyllTmp: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.paths.build.jekyll %>/_tmp',
                        src: ['{**,.*}'],
                        dest: '<%= happyPlan.paths.build.jekyll %>'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.paths.src.fonts %>/',
                        src: ['**'],
                        dest: '<%= happyPlan.paths.build.fonts %>/' }
                ]
            },
            // to avoid imagemin when dev
            fakeImagemin: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.paths.src.images %>/', 
                        src: ['**'],
                        dest: '<%= happyPlan.paths.build.images %>/'
                    }
                ]
            },
            bower_components: {
                files: happyPlan.bower.files
            }
        },
        
        webfont: {
            icons: {
                src: '<%= happyPlan.paths.src.webfonts %>/icons/*.svg',
                dest: '<%= happyPlan.paths.build.webfonts %>/icons',
                destCss: '<%= happyPlan.paths.src.styles %>',
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
                    noLineComments: true
                }
            }
        },
        
        uglify: {
            // just merge hp options correctly
            dev: grunt.util._.extend(
                {},
                happyPlan.grunt.uglify,
                {
                    options: grunt.util._.extend({
                        "mangle": false,
                        "compress": false,
                        "beautify": true,
                        "sourceMapRoot": "file:///Users/MoOx/Development/moox.fr/", // is there something like '<%= grunt.pwd %>' ?
                        "sourceMap": "<%= happyPlan.paths.build.scripts %>/uglify.js.map",
                        "sourceMappingURL": "<%= happyPlan.baseUrls.scripts %>/uglify.js.map"
                    },
                    happyPlan.grunt.uglify.options || {})
                }
            ),
            dist: happyPlan.grunt.uglify
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 4,
                    progressive: true
                },
                files: [
                    // '<%= happyPlan.paths.build.images %>': '<%= happyPlan.paths.src.images %>/**/*',
                    // '<%= happyPlan.paths.build.medias %>': '<%= happyPlan.paths.build.medias %>/**/*'
                    {
                        "expand": true,
                        "cwd": "<%= happyPlan.paths.src.images %>",
                        "src": "**/*.{png,jpg,jpeg,gif,svg}",
                        "dest": "<%= happyPlan.paths.build.images %>"
                    }
                ]
            }
        },
        
        regarde: {
            configs: {
                files: ['<%= happyPlan.paths.configs._ %>/**/*'],
                tasks: ['configs']
            },
            html: {
                files: [
                    '<%= happyPlan.paths.src.jekyll %>/**/*.{html,md,txt}',
                    '<%= happyPlan.paths.src.jekyll %>/_config.yml',
                    '<%= happyPlan.paths.src.jekyll %>/.htaccess'
                ],
                tasks: ['jekyll:build', 'copy:jekyllTmp', 'livereload']
            },
            js: {
                files: ['<%= happyPlan.paths.src.scripts %>/**/*'],
                tasks: ['jshint', 'uglify:dev']
            },
            scss: {
                files: ['<%= happyPlan.paths.src.styles %>/**/*'],
                tasks: ['compass:dev']
            },
            images: {
                files: ['<%= happyPlan.paths.src.images %>/**/*'],
                tasks: ['copy:fakeImagemin']
            },
            fonts: {
                files: ['<%= happyPlan.paths.src.fonts %>/**/*'],
                tasks: ['copy:fonts']
            },
            webfonts: {
                files: ['<%= happyPlan.paths.src.webfonts %>/icons/*.svg'],
                tasks: 'webfont:icons'
            },
            livereload: {
                files: ['<%= happyPlan.paths.build._ %>/**'],
                tasks: 'livereload'
            }
        }
    });

    grunt.registerTask('default', ['dev', 'livereload-start', 'regarde']);

    // configs shouldn't be fired each build, because if we do so, compass just start with a fresh cache (no-cache = fews seconds...)
    // So, 'regarde' fire 'configs' :)
    grunt.registerTask('configs', ['replace:compass', 'replace:jekyll']);
    
    grunt.registerTask('init', ['configs']);
    
    grunt.registerTask('build', ['configs', 'jekyll:build', 'copy:jekyllTmp', 'copy:fonts', 'copy:bower_components', 'webfont:icons']);
    
    grunt.registerTask('dev', ['jshint', 'build', 'compass:dev', 'uglify:dev', 'copy:fakeImagemin']);
    grunt.registerTask('dist', ['jshint', 'clean:build', 'build', 'clean:jekyll', 'compass:dist', 'uglify:dist', 'imagemin:dist']);
    
    // waiting for https://github.com/gruntjs/grunt-contrib-imagemin/issues/11 to use just 'dist' here
    grunt.registerTask('test', ['jshint', 'configs', 'build', 'clean:jekyll', 'compass:dist', 'uglify:dist', 'copy:fakeImagemin']);

    grunt.registerTask('server', 'jekyll:server');
};
