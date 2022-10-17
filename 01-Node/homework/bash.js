const commands = require('./commands/index.js');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  if(cmd === 'date') {
    commands[cmd]()
  }
  if(cmd === 'pwd') {
    commands[cmd]()
  }
  process.stdout.write('\nprompt > ');
});
