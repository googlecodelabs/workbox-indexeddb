/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// import our dependencies
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const workboxBuild = require('workbox-build');

// this task removes old files
gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

// this task copies "app" files into "build"
gulp.task('copy', () =>
  gulp.src([
    'app/**/*',
  ]).pipe(gulp.dest('build'))
);

// this is our default task
gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'service-worker', // adds the service worker injection to our default task
    cb
  );
});

// this task watches our "app" files & rebuilds whenever they change
gulp.task('watch', function() {
  gulp.watch('app/**/*', ['default']);
});

// this task injects a precache manifest into our service worker
gulp.task('service-worker', () => {
  return workboxBuild.injectManifest({
    swSrc: 'app/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      'style/main.css',
      'index.html',
      'js/idb-promised.js',
      'js/main.js',
      'images/**/*.*',
      'manifest.json'
    ]
  }).catch(err => {
    console.log('[ERROR]: ' + err);
  });
});
