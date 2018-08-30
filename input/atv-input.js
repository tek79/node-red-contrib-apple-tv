module.exports = function(RED) {

  function atvInputNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    //import the config node
    var atvSettings = RED.nodes.getNode(config.atvSettings);
    //require the atv library
    var atv = require('node-appletv');

    // see example above for how to get the credentials string
    var credentials = atv.parseCredentials(atvSettings.appleTVkey);
    let uniqueIdentifier = atvSettings.uniqueIdentifier;

    var TV;
    atv.scan(uniqueIdentifier).then(devices => {
      TV = devices[0];
      return TV.openConnection(credentials);
    })

    node.on('input', function(msg) {
      command = msg.payload.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      //TV.sendKeyCommand(Menu);
      TV.sendKeyCommand(atv.AppleTV.Key[command]).catch(error => {
        console.log(error);
      });
      node.send(msg);
    });
  }
  RED.nodes.registerType("atv-input", atvInputNode);
}
