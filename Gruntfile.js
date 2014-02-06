module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    "src/static.js",
                    "src/methods/*.js",
                    "src/objects/aggregateMethod/*.js",
                    "src/objects/axis/ctor.js",
                    "src/objects/axis/methods/*.js",
                    "src/objects/chart/ctor.js",
                    "src/objects/chart/methods/*.js",
                    "src/objects/color/*.js",
                    "src/objects/eventArgs/*.js",
                    "src/objects/exception/*.js",
                    "src/objects/legend/ctor.js",
                    "src/objects/legend/methods/*.js",
                    "src/objects/plot/*.js",
                    "src/objects/series/ctor.js",
                    "src/objects/series/methods/*.js",
                    "src/objects/storyboard/ctor.js",
                    "src/objects/storyboard/methods/*.js",
                    "src/objects/validation/*.js"
                ],
                dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
            },
            test: {
                src: '<%= concat.dist.src %>',
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3001,
                    base: '.'
                }
            }
        },
        jslint: {
            files: [
                'Gruntfile.js',
                'test/**/*.spec.js',
                "src/**/*.js"
            ],
            directives: {
                browser: true,
                nomen: true,
                predef: [
                    'd3',
                    'module',
                    'console',
                    'jasmine',
                    'dimple'
                ]
            }
        },
        prop: {
            dist: {
                src: [
                    'examples/templates/*.html'
                ]
            },
            options: {
                dest: 'examples/',
                tag: '{version}',
                version: 'v<%= pkg.version %>',
                header: "<!----------------------------------------------------------------->\n" +
                        "<!-- AUTOMATICALLY GENERATED CODE - PLEASE EDIT TEMPLATE INSTEAD -->\n" +
                        "<!----------------------------------------------------------------->\n"
            }
        },
        karma: {
            options: {
                basepath: '',
                frameworks: ['jasmine'],
                files: [
                    'lib/d3.v3.min.js',
                    'tmp/*.js',
                    'test/**/*.spec.js',
                    'test/*.spec.js'
                ],
                reporters: ['progress'],
                port: 9876,
                colors: true,
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            },
            continuous: {
                background: true
            }
        },
        watch: {
            src: {
                files: [
                    '<%= concat.test.src %>'
                ],
                tasks: ['concat:test', 'karma:continuous:run']
            },
            test: {
                files: [
                    'test/**/*.spec.js',
                    'test/*.spec.js'
                ],
                tasks: ['karma:continuous:run']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Propagate version into relevant files
    grunt.registerMultiTask('prop', 'Propagate Versions.', function () {
        var options = this.options(),
            outPath = options.dest,
            tag = options.tag,
            version = options.version,
            header = options.header;
        grunt.log.writeln("");
        grunt.log.writeln("Replacing " + tag + " with " + version);
        grunt.log.writeln("------------------------------------------------------");
        this.files.forEach(function (f) {
            f.src.filter(function (filepath) {
                var result = true;
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('File "' + filepath + '" not found.');
                    result = false;
                }
                return result;
            }).map(function(filepath) {
                // Read file source.
                var src = grunt.file.read(filepath);
                // Replace the version
                src = src.split(tag).join(version);
                // Write the new file
                grunt.log.writeln("Creating " + outPath + filepath.substring(filepath.lastIndexOf("/") + 1));
                grunt.file.write(outPath + filepath.substring(filepath.lastIndexOf("/") + 1), header + src);
            });
        });
    });

    // Default tasks
    grunt.registerTask('default', ['jslint', 'concat', 'uglify', 'connect', 'prop']);
    grunt.registerTask('test:unit', ['concat:test', 'karma:unit']);
    grunt.registerTask('test', ['karma:continuous:start', 'watch']);

};