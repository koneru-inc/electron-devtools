const gulp = require('gulp');
const electron = require('electron-connect').server.create({ path: __dirname })

gulp.task('serve', () => {
  electron.start();
  gulp.watch('src/index.js', electron.restart);

  // Reload renderer process
  gulp.watch(['index.js', 'index.html'], electron.reload);
});


