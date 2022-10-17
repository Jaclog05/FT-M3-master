
module.exports = {
    pwd: () => {process.stdout.write(process.env.PWD)},
    date: () => {process.stdout.write(Date())}
}