module.exports = function(RED) {
  const atv = require('node-appletv');

  var pin = null;

  function atvSettings(n) {
    RED.nodes.createNode(this,n);
    this.appleTVkey = n.appleTVkey;
    this.pin = n.pin;
    this.on('close', function() {
      pin = null;
    });
  }
  RED.nodes.registerType("atv-config",atvSettings);
  // DISCOVER ATVs ON LOCAL NETWORK
  RED.httpAdmin.get('/atv/discover', RED.auth.needsPermission("atv-config.read"), function(req, res, next) {
    return atv.scan()
    .then(devices => {
      var options = devices.map(device => {
        mapped = {name: device.name, uid: device.uid}
        return mapped
      })
      return options;
    })
    .then(options => {
      res.send(options);
    })
  });
	RED.httpAdmin.get('/atv/pair/:uid', RED.auth.needsPermission("atv-config.read"), function(req, res, next) {
    return atv.scan(req.params.uid)
    .then(devices => {
      // devices is an array of AppleTV objects
      let device = devices[0];
      return device.openConnection()
        .then(device => {
            return device.pair();
        })
        .then(callback => {
          return new Promise((resolve, reject) => {
            var poller = setInterval(() => {
              console.log("polling - " + pin);
              if (pin != null && pin.length == 4) {
                clearInterval(poller);
                resolve([callback, pin])
              }
            }, 1500);
          })
        })
        .then(([callback, pin]) => {
          console.log("finished polling - " + pin)
          return callback(pin.toString());
        });
    })
    .then(device => {
        // you're paired!
        let credentials = device.credentials.toString();
        console.log(credentials);
        res.send(credentials);
        return device;
    })
    .then(device => {
      pin = null;
      device.closeConnection();
    })
    .catch(error => {
        console.log(error);
    });
	});
  RED.httpAdmin.post('/atv/postPin', RED.auth.needsPermission("atv-config.read"), function(req, res, next) {
    console.log(req.body);
    pin = req.body.pin;
    res.sendStatus(200);
	});
}
