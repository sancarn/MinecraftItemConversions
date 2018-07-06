function getJSON(filename) {
    return $.ajax({
        dataType: "json",
        url: filename,
        mimeType: "application/json",
    }).then((obj) => {
        return obj;
    });
}

let default_choices = [{
        "style":{
            "color":"#c6993f",
            "dashes":false
        },
        "name":"Crafting",
        "value":"Crafting",
        "description":"Crafting",
        "type": "crafting"
    },{
        "style":{
            "color":"#ed0e07",
            "dashes":false
        },
        "name":"Smelting",
        "value":"Smelting",
        "description":"Smelting",
        "type":"furnace"
    }];

function loadContent() {
    loadVanillaItems()
    .catch((error) => {
        console.error("Failed to load vanilla items: " + error);
        VanillaItems = {};
    }).then(() => {
        fillAutocomplete();
        return getJSON("data/network.data.json");
    }).catch((error) => {
        console.error("Failed to load network.data.json. Hosted locally? Error: " + error);
        return default_choices;
    }).then((choices) => {
        window.choices = choices;
        fillChoices();
        return loadConversions();
    }).fail((error) => {
        console.error("Failed to load item conversions: " + error);
    }).then(() => {
        renderRandomGraph();
    });
}

var VanillaItems;

function loadVanillaItems() {
    return getJSON("data/items.json")
    .then((content) => {
        VanillaItems = content;
    });
}

var ItemConversions = {};

function loadConversions() {
    let retval;
    for (let entry of window.choices) {
        console.info("Loading conversion type \"" + entry.type + "\".");
        retval = getJSON("data/conversions/" + entry.type + ".json")
        .then((content) => {
            ItemConversions[entry.type] = content;
        }).catch((error) => {
            console.error("Failed to load conversion \"" + entry.type + "\". Error: ", error);
        });
    }
    return retval;
}
