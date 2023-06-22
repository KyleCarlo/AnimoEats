function loadScript(url, callback) {
  var script = document.createElement('script');
  script.src = url;

  script.onload = function() {
    callback();
  };

  document.head.appendChild(script);
}

loadScript('index.js', function() {
  // Code to execute after the 'otherScript.js' is loaded
  // You can access functions and variables defined in 'otherScript.js' here
  initialize(); // Example function call from 'otherScript.js'
});