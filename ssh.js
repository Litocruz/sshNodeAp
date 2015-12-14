var Client = require('ssh2').Client;

var conn = new Client();
var conn2 = new Client();
//var conn3 = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec('cat /etc/version', function(err, res) {
    if (err) {return conn.end(); throw err; }
    res.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
      conn2.connect({
        host: '191.168.200.37',
        port: 22,
        username: 'admin',
        password: 'admin'
      });
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '192.168.200.3',
  port: 22,
  username: 'admin',
  password: 'admin'
});

conn2.on('ready', function() {
  console.log('Client2 :: ready');
  conn2.exec('pwd', function(err, res) {
    if (err) {return conn.end(); throw err; }
    res.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
      /*conn3.connect({
        host: '10.50.0.23',
        port: 22,
        username: 'admin',
        password: 'qmzp1029'
      });*/
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
});
/*
conn3.on('ready', function() {
  console.log('Client3 :: ready');
  conn3.exec('pwd', function(err, res) {
    if (err){return conn2.end(); throw err;}
    res.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn3.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
});*/
