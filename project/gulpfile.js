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
const gulp = require('gulp');
const del = require('del');

// Clean "build" directory
const clean = () => {
  return del(['build/*'], {dot: true});
};
gulp.task('clean', clean);

// Copy "app" directory to "build" directory
const copy = () => {
  return gulp.src(['app/**/*']).pipe(gulp.dest('build'));
};
gulp.task('copy', copy);

// TODO - add "service worker" task here

// This is the app's build process
const build = gulp.series('clean', 'copy');
gulp.task('build', build);

// Watch our "app" files & rebuild whenever they change
const watch = () => {
  gulp.watch('app/**/*', build);
};
gulp.task('watch', watch);

// Set the default task to "build"
gulp.task('default', build);
