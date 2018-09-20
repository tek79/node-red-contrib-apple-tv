
# node-red-contrib-apple-tv

A light wrapper around [node-appletv](https://github.com/edc1591/node-appletv) by [Evan Coleman](https://github.com/edc1591) to send commands to Apple TV **(v4, the one with Touch Remote, and later)** from Node Red.

Relatively straightforward, simply drag a ATV input onto the canvas, configure the Apple TV (pairing), and you're ready to roll.

### Installation
The library this node wraps has some rather heavy dependencies, and so may take some time to install. Please refer to [node-appletv](https://github.com/edc1591/node-appletv) for more information about its package and dependencies.

## Installation on Raspberry pi
Installation on RPi3 requires a few extra packages depending on your platform. If you've already installed the node-red package, you'll need to install the below and run npm install again.
I've only tested this library on Raspbian Stretch Lite, so some of these packages may already exist in a fuller installation.

```
sudo apt-get install libtool autoconf build-essential libavahi-compat-libdnssd-dev
```

You'll also need to install openssl which [according to this link](https://raspberrypi.stackexchange.com/questions/66782/how-to-install-openssl-1-0-2-on-raspberry-pi3?rq=1) is best compiled from source.
```
git clone git://git.openssl.org/openssl.git
cd openssl
./config
make
make test
sudo make install
```

If you're having trouble with ed25519, mdns, or sodium, re-install them in the root folder of your node-red, ensuring you've installed all the packages listed above.

### Pairing
-   Drag ATV input onto the canvas and select 'Add new atv-config...'
-   Once the config editor loads, wait until a list of Apple TV devices on your network appear in the dropdown
-   Select your device from the dropdown and click "Initiate connection"
-   Once the pairing code appears on your Apple TV, enter it in the Pin field and press the submit button to the right
-   On a successful pairing, a string will appear in the Apple TV key string field
-   Save and deploy
-   The ATV input node can now take commands as listed in the ATV input node help (and listed below)

### Input (and output)
A very simple node that takes the following commands as a string on msg.payload
-   Menu
-   Select
-   Play
-   Pause
-   Up
-   Down
-   Left
-   Right
-   Next
-   Previous
-   Suspend

**N.b. The Apple TV doesn't have native volume control, rather it outputs maximum volume and provides (via it's remote) a means to change the volume on the attached receiver (TV or AV receiver). This means there is no way at present to programatically change the volume. If you have a solution, please let me know!**
