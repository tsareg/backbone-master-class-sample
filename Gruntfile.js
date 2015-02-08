var rewrite = require("connect-modrewrite");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        connect: {
            options: {
                middleware: function ( connect, options, middlewares ) {
                    var rules = [
                        "!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html"
                    ];
                    middlewares.unshift(rewrite(rules));
                    return middlewares;
                }
            },
            server: {
                options: {
                    port: 8000,
                    hostname: '*'
                }
            }
        }
    });
};