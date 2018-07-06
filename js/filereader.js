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
    getJSON("data/network.data.json")
    .then((choices) => {
        window.choices = choices;
        // TODO Make sure all content is loaded before being accessed
        fillChoices();
        loadConversions();
    }).fail((error) => {
        if (error.status == 0) {
            window.choices = default_choices;
            fillChoices();
            console.error("Failed to load conversion types. Hosted locally?");
        } else {
            console.error(error);
        }
    });
}

var ItemConversions = {};

function loadConversions() {
    for (let entry of window.choices) {
        console.info("Loading conversion type \"" + entry.type + "\".");
        getJSON("data/conversions/" + entry.type + ".json")
        .then((content) => {
            ItemConversions[entry.type] = content;
        }).fail((error) => {
            console.error("Failed to load conversion \"" + entry.type + "\". Error: ", error);
        });
    }
}
