
# node-red-contrib-apple-tv

A light wrapper around [node-appletv](https://github.com/edc1591/node-appletv) by [Evan Coleman](https://github.com/edc1591) to send commands to Apple TV from Node Red.

Relatively straightforward, simply drag a ATV input onto the canvas, configure the Apple TV (pairing), and you're ready to roll.

### Installation
The library this node wraps has some rather heavy dependencies, and so may take some time to install. Please refer to [node-appletv](https://github.com/edc1591/node-appletv) for more information about its package and dependencies.

### Pairing
-   Drag ATV input onto the canvas and select 'Add new configuration...'
-   Once the config editor loads, wait until a list of Apple TV devices on your network appear in the dropdown (currently it'll show nothing until the list arrives - around 10 seconds)
-   Select your device from the dropdown and click the button to the right (looks like a magnifying glass)
-   Once the pairing code appears on your Apple TV, enter it in the Pairing Pin field and press the submit button to the right (also looks like a magnifying glass...)
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
