# MinecraftItemConversions
Run the code here:

https://sancarn.github.io/MinecraftItemConversions

Filled with JSON files demonstrating Item->Item conversions.

This dataset includes all items which are both required and lost in a item conversion.

For example:

Dirt is required but not consumed when growing a sapling into a tree, thus is ignored.
Bonemeal is consumed but not required when growing a tree and thus is ignored.
But the sapling is consumed and required when growing a tree, and thus is included in this assessment.

Conversion's covered:

* Conversion via Game Mechanics,
* Conversion via Smelting,
* Conversion via Crafting,
* Conversion via Trading,
* Conversion via Brewing,
* Conversion via Anvil_Repair
* Conversion via Anvil_Enchanting,
* Conversion via Enchanting

Doesn't cover:

* Fireworks


## Developer startup instructions

While developing the application offline you are required to launch browser in certain ways to allow CORS file requests.

### Mozilla
`fetch()` API actually works on chrome perfectly. Simply open up the HTML page! No need to disable web security.

### Chrome
#### Linux
`google-chrome --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security`
#### Windows
`chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`
#### Mac
`open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security`
