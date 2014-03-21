module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:dist', [
    'jshint'
  , 'happyplan:build'
  // made by hand when needed, too long process
  // , 'imagemin:dist'
  ])
}
