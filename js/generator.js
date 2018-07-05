var missing = "";
var mapping = killDupes(makeMapping());

var zip = new JSZip();

var allConvs = joinConversions(ItemConversions, Object.keys(ItemConversions));
checkNames(allConvs);
//var craftCount = countResults(generateResults(allConvs));

// ["anvilRepair","Anvil_Enchant","Crafting","Enchantment","Mechanics","Potion","Potion_Fuel","Potion_TippedArrow","Smelting","Smelting_Fuel","Trading"]

var subset = {};

subset["All"] = Object.keys(ItemConversions);
subset["Craft_Smelt"] = ["Smelting", "Crafting"];
subset["Not_SquareWave"] = ["anvilRepair","Anvil_Enchant","Crafting","Enchantment","Mechanics","Potion","Potion_Fuel","Potion_TippedArrow","Smelting"];

for (var name in ItemConversions) {
	var list = [];
	for (var type in ItemConversions) {
		if (name !== type) {
			list.push(type);
		}
	}
	subset[name] = [name];
	subset["Not_" + name] = list;
}

for (var name in subset) {
	subset[name] = generateResults(joinConversions(ItemConversions, subset[name]));
}

var output = "ItemName";

for (var name in subset) {
	output += "\t" + name;
}
output += "\n";
for (var item in vanilla_items) {
	output += item;
	for (var name in subset) {
		if (subset[name][item] == undefined) {
			output += "\t1";
			continue;
		}
		var tmp = subset[name][item].length-1;
		output += "\t" + Object.keys(subset[name][item][tmp]).length;
	}
	output += "\n";
}

zip.file("output.txt", output);

//var justCraft = joinConversions(ItemConversions, ["Crafting","Smelting"]);
//var justCraftCount = countResults(generateResults(justCraft));
//var noFuel = joinConversions(ItemConversions, ["anvilRepair","Anvil_Enchant","Crafting","Enchantment","Mechanics","Potion","Potion_Fuel","Potion_TippedArrow","Smelting","Trading"]);
//var noFuelCount = countResults(generateResults(noFuel));


//zip.file("crafting_mapping.json", JSON.stringify(mapping));
//zip.file("missing.txt", missing);
//zip.file("craftCount.txt", craftCount);
//zip.file("justCraftCount.txt", justCraftCount);
//zip.file("noFuel.txt", noFuelCount);

zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "crafting_mapping.zip");
});
