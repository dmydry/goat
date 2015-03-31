module.exports = function (grunt) {

    "use strict";

    var gzip = require("gzip-js");

    // Project configuration.
    grunt.initConfig({
        jshint: {
            dist: {
                src: [
                    "assets/js/*.js"
                ],
                options: {
                    jshintrc: "assets/js/.jshintrc"
                }
            },
            test: {
                src: [
                    "test/qunit/*.js",
                    "test/mocha/*.js"
                ],
                options: {
                    jshintrc: "test/.jshintrc"
                }
            },
            other: {
                src: [
                    "Gruntfile.js",
                    "configs/*",
                    "controllers/*",
                    "models/*",
                    "utils/*"
                ],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ["assets/css"],
                    compress: true
                },
                files: {
                    "dist/css/styles.min.css": "assets/css/styles.less"
                }
            },
            development: {
                options: {
                    paths: ["assets/css"],
                    compress: false
                },
                files: {
                    "dist/css/styles.min.css": "assets/css/styles.less"
                }
            }
        },
        watch: {
            style: {
                files: ["assets/css/*.less"],
                tasks: ["less"],
                options: {
                    nospawn: true,
                    debounceDelay: 500
                }
            },
            script: {
                files: ["assets/js/*.js"],
                tasks: ["build", "jshint"],
                options: {
                    nospawn: true,
                    debounceDelay: 500
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/img",
                        src: [
                            "*",
                            "*/**"
                        ],
                        dest: "dist/img/"
                    }
                ]
            }
        },
        compare_size: {
            files: [
                "dist/js/main.min.js",
                "dist/css/styles.min.css"
            ],
            options: {
                compress: {
                    gz: function (contents) {
                        return gzip.zip(contents, {}).length;
                    }
                },
                cache: "dist/.sizecache.json"
            }
        },
        qunit: {
            all: ["test/index.html"]
        },
        requirejs: {
            main: {
                options: {
                    baseUrl: "assets/js",
                    name: "main",
                    out: "dist/js/main.min.js",
                    optimize: "uglify2",
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    paths: {
                        // libs
                        "jquery": "empty:",
                        "jquery-ui": "empty:",
                        "bootstrap": "empty:",

                        // plugins
                        "json": "../../dist/vendors/requirejs-plugins/src/json",
                        "text": "../../dist/vendors/requirejs-text/text"
                    },
                    exclude: ["text", "json"]
                }
            },
            requirejs: {
                options: {
                    name: "dist/vendors/requirejs/require",
                    out: "dist/vendors/requirejs/require.min.js"
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-compare-size");
    grunt.loadNpmTasks("grunt-contrib-requirejs");

    // Task
    grunt.registerTask("default", ["requirejs", "jshint", "less", "copy", "compare_size"]);
    grunt.registerTask("travis", ["requirejs", "jshint", "less", "compare_size"]);
    grunt.registerTask("build", ["default"]);
    grunt.registerTask("test", ["qunit"]);

};