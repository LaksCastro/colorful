var ghpages = require('gh-pages');

ghpages.publish('build', function (err) { 
  if (err) {
    throw err;
  }
  
  console.log('Success');
});
