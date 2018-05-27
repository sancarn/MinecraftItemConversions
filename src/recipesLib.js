function makeMapping() {
	var mapping = [];
	for (res in recipes) {
		var type = recipes[res].type;
		var result = undefined;
		var ingredients = [];
		switch (type) {
			case "crafting_shaped":
				result = recipes[res].result.item;
				for (k in recipes[res]["key"]) {
					ingredients = ingredients.concat(getItems([recipes[res]["key"][k]]));
				}
				break;
			case "crafting_shapeless":
				result = recipes[res].result.item;
				ingredients = ingredients.concat(getItems(recipes[res].ingredients));
				break;
			default:
				console.log("Unknown crafting type: " + type);
				missing += "Unknown crafting type: " + type + "\n";
		}
		if (result) {
			for (i in ingredients) {
				mapping.push({"source":ingredients[i], "result":result})
			}
		}
	}
	return mapping;
}

function getFromTag(tag) {
	return itemTags[tag.substr(10)+".json"].values;
}

function getItems(list) {
	var items = [];
	for (item in list) {
		if (list[item].keys == undefined) {
			items = items.concat(resolveItems(list[item]));
		} else {
			for (i in list[item]) {
				items = items.concat(resolveItems(list[item][i]));
			}
		}
	}
	return items;
}

function resolveItems(item) {
	var items = [];
	for (key in item) {
		switch (key) {
			case "tag":
				items = items.concat(getFromTag(item[key]));
				break;
			case "item":
				items.push(item[key]);
				break;
			default:
				console.log("Unknown item type: " + key);
				missing += "Unknown item type: " + key + "\n";
		}
	}
	return items;
}

function equalsCrap(o1, o2) {
	return JSON.stringify(o1) === JSON.stringify(o2);
}

function killDupes(mapping) {
	var newMapping = [];
	for (i in mapping) {
		var flag = true;
		for (ni in newMapping) {
			if (equalsCrap(mapping[i], newMapping[ni])) {
				flag = false;
				break;
			}
		}
		if (flag) {
			newMapping.push(mapping[i]);
		}
	}
	return newMapping;
}

function killDuplicates(list) {
	var newList = {};
	for (var i in list) {
		newList[list[i].source + "->" + list[i].result] = list[i];
	}
	return Object.values(newList);
}

function isSameRecipe(i1, i2) {
	if (i1.source != i2.source) {
		return false;
	}
	if (i1.result != i2.result) {
		return false;
	}
	return true;
}

function checkThing(thing) {
	return !(vanilla_items[thing] == undefined && allEnchantments[thing] == undefined && allPotions[thing] == undefined && allTippedArrows[thing] == undefined);
}

function checkNames(convs) {
	for (var i in convs) {
		var obj = convs[i];
		if (!checkThing(obj.source)) {
			console.log("Unknown item: " + obj.source + " in " + JSON.stringify(obj));
		}
		if (!checkThing(obj.result)) {
			console.log("Unknown item: " + obj.result + " in " + JSON.stringify(obj));
		}
	}
}

function joinConversions(convs, keysUsed) {
	if(keysUsed==undefined) keysUsed = Object.keys(convs)
	retval = [];
	keysUsed.forEach(function(key){
		retval = retval.concat(convs[key]);
	})
	return killDuplicates(retval);
}

function filter(convs,query){
	var retval = [];
	var search = [query];
	var covered = {};
	while (search.length>0) {
		var q=search.pop();
		covered[q] = true;
		for (conv of convs) {
			if(conv.source != conv.result) {
				if (q == conv.source) {
					retval.push(conv);
					if (!covered[conv.result]) search.push(conv.result);
				}
			}
		}
	}
	return retval;
}

function generateResults(allConvs) {
	var retval = {};
	for (var i in allConvs) {
		var conv = allConvs[i];
		if (retval[conv.source] == undefined) {
			retval[conv.source] = [{}];
		}
		retval[conv.source][0][conv.source] = conv.source;
		retval[conv.source][0][conv.result] = conv.result;
	}
	var flag = true;
	while (flag) {
		flag = false;
		for (var r in retval) {
			var list = retval[r];
			var pos = list.length-1;
			var nextGen = {};
			for (var k in list[pos]) {
				nextGen[k] = list[pos][k];
			}
			for (var e in list[pos]) {
				if (retval[list[pos][e]] == undefined) {
					//console.log("Nothing crafted from: " + list[pos][e]);
					continue;
				}
				var toadd = retval[list[pos][e]][0];
				for (var add in toadd) {
					nextGen[add] = add;
				}
			}
			retval[r].push(nextGen);
			if (Object.keys(retval[r][retval[r].length-1]).length != Object.keys(retval[r][retval[r].length-2]).length) {
				flag = true;
			}
		}
	}
	return retval;
}

function countResults(res) {
	var retval = "";
	for (var r in res) {
		retval += r;
		for (r2 in res[r]) {
			retval += "\t" + Object.keys(res[r][r2]).length;
		}
		retval += "\n"
	}
	return retval;
}
