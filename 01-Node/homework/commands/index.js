var fs = require('fs')

module.exports = {
    pwd: () => {process.stdout.write(process.env.PWD)},
    date: () => {process.stdout.write(Date())},
    ls: () => {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
          });
    },
    echo: (data) => {process.stdout.write(data)}
}