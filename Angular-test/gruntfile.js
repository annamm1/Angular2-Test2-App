module.exports = function (grunt) {  
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        ts: {
            base: {
                src: ['app/main.ts', 'app/*.ts'],
                outDir: 'wwwroot',
                tsconfig: './tsconfig.json'
            }
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'wwwroot/app',
                    src: ['*.js'],
                    dest: 'wwwroot/app'
                }]
            },
            options: {
                sourceMap: true
            }
        },

        // Copy all JS files from external libraries and required NPM packages to wwwroot/js
        copy: {
            main: {
                files: [
                   {
                    expand: true,
                    cwd: 'app/',
                    flatten: true,
                    src: [
                        '*.js'
                    ],
                    dest: 'wwwroot/app/',
                    filter: 'isFile'
                },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['*.html', '*.css'],
                        dest: 'wwwroot/app/',
                        filter: 'isFile'
                    }]
            }
        },

        // Watch specified files and define what to do upon file changes
        watch: {
            scripts: {
                files: ['app/*.js'],
                tasks: ['ts', 'uglify', 'copy']
            }
        }
    });

    // Define the default task so it will launch all other tasks
    grunt.registerTask('default', ['ts', 'uglify', 'copy', 'watch']);
};