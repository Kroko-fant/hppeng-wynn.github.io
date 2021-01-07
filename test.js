/*
 * TESTING SECTION
 */

console.log(location.href);

/*
 * END testing section
 */

let player_build;
// Set up item lists for quick access later.
let armorTypes = [ "helmet", "chestplate", "leggings", "boots" ];
let accessoryTypes = [ "ring", "bracelet", "necklace" ];
let weaponTypes = [ "wand", "spear", "bow", "dagger", "relik" ];
let item_fields = [ "name", "displayName", "tier", "set", "slots", "type", "material", "drop", "quest", "restrict", "nDam", "fDam", "wDam", "aDam", "tDam", "eDam", "atkSpd", "hp", "fDef", "wDef", "aDef", "tDef", "eDef", "lvl", "classReq", "strReq", "dexReq", "intReq", "agiReq", "defReq", "hprPct", "mr", "sdPct", "mdPct", "ls", "ms", "xpb", "lb", "ref", "str", "dex", "int", "agi", "def", "thorns", "exploding", "spd", "atkTier", "poison", "hpBonus", "spRegen", "eSteal", "hprRaw", "sdRaw", "mdRaw", "fDamPct", "wDamPct", "aDamPct", "tDamPct", "eDamPct", "fDefPct", "wDefPct", "aDefPct", "tDefPct", "eDefPct", "fixID", "category", "spPct1", "spRaw1", "spPct2", "spRaw2", "spPct3", "spRaw3", "spPct4", "spRaw4", "rainbowRaw", "sprint", "sprintReg", "jh", "lq", "gXp", "gSpd" ];
let nonRolledIDs = ["name", "displayName", "tier", "set", "slots", "type", "material", "drop", "quest", "restrict", "nDam", "fDam", "wDam", "aDam", "tDam", "eDam", "atkSpd", "hp", "fDef", "wDef", "aDef", "tDef", "eDef", "lvl", "classReq", "strReq", "dexReq", "intReq", "agiReq", "defReq","str", "dex", "int", "agi", "def", "fixID", "category"];
let rolledIDs = ["hprPct", "mr", "sdPct", "mdPct", "ls", "ms", "xpb", "lb", "ref", "thorns", "exploding", "spd", "atkTier", "poison", "hpBonus", "spRegen", "eSteal", "hprRaw", "sdRaw", "mdRaw", "fDamPct", "wDamPct", "aDamPct", "tDamPct", "eDamPct", "fDefPct", "wDefPct", "aDefPct", "tDefPct", "eDefPct", "spPct1", "spRaw1", "spPct2", "spRaw2", "spPct3", "spRaw3", "spPct4", "spRaw4", "rainbowRaw", "sprint", "sprintReg", "jh", "lq", "gXp", "gSpd"];
let itemTypes = armorTypes.concat(accessoryTypes).concat(weaponTypes);
let itemLists = new Map();
for (const it of itemTypes) {
    itemLists.set(it, []);
}
let itemMap = new Map();

/*
 * Function that takes an item list and populates its corresponding dropdown.
 * Used for armors and bracelet/necklace.
 */
function populateItemList(type) {
    let item_list = document.getElementById(type+"-items");
    for (const item of itemLists.get(type)) {
        let el = document.createElement("option");
        el.value = item;
        item_list.appendChild(el);
    }
}

/*
 * Populate dropdowns, add listeners, etc.
 */
function init() {
    let noneItems = [
        ["helmet", "No Helmet"],
        ["chestplate", "No Chestplate"],
        ["leggings", "No Leggings"],
        ["boots", "No Boots"],
        ["ring", "No Ring 1"],
        ["ring", "No Ring 2"],
        ["bracelet", "No Bracelet"],
        ["necklace", "No Necklace"],
        ["wand", "No Weapon"],
    ];
    for (let i = 0; i < 9; i++) {
        let item = Object();
        for (const field of item_fields) {
            item[field] = 0;
        }
        item.type = noneItems[i][0];
        item.name = noneItems[i][1];
        item.displayName = item.name;
        item.set = null;
        item.quest = null;
        item.skillpoints = [0, 0, 0, 0, 0];
        item.has_negstat = false;
        item.reqs = [0, 0, 0, 0, 0];

        noneItems[i] = item;
    }
    items = items.concat(noneItems);
    console.log(items);
    for (const item of items) {
        itemLists.get(item.type).push(item.displayName);
        itemMap.set(item.displayName, item);
    }
    /*for (const item of noneItems){
        itemLists.get(item.type).push(item.name);
        itemMap.set(item.name, item);
    }*/
    
    for (const armorType of armorTypes) {
        populateItemList(armorType);
        // Add change listener to update armor slots.
        document.getElementById(armorType+"-choice").addEventListener("change", (event) => {
            let item = itemMap.get(event.target.value);
            if (item !== undefined) {
                document.getElementById(armorType+"-slots").textContent = item.slots + " slots";
            }
            else {
                document.getElementById(armorType+"-slots").textContent = "X slots";
            }
        });
    }

    let ring1_list = document.getElementById("ring1-items");
    let ring2_list = document.getElementById("ring2-items");
    for (const ring of itemLists.get("ring")) {
        let el1 = document.createElement("option");
        let el2 = document.createElement("option");
        el1.value = ring;
        el2.value = ring;
        ring1_list.appendChild(el1);
        ring2_list.appendChild(el2);
    }

    populateItemList("bracelet");
    populateItemList("necklace");

    let weapon_list = document.getElementById("weapon-items");
    for (const weaponType of weaponTypes) {
        for (const weapon of itemLists.get(weaponType)) {
            let el = document.createElement("option");
            el.value = weapon;
            weapon_list.appendChild(el);
        }
    }

    // Add change listener to update weapon slots.
    document.getElementById("weapon-choice").addEventListener("change", (event) => {
        let item = itemMap.get(event.target.value);
        if (item !== undefined) {
            document.getElementById("weapon-slots").textContent = item.slots + " slots";
        }
        else {
            document.getElementById("weapon-slots").textContent = "X slots";
        }
    });
}

function calculateBuild(){
    /*  TODO: implement level changing
        Make this entire function prettier
    */
    let helmet = document.getElementById("helmet-choice").value;
    let chestplate = document.getElementById("chestplate-choice").value;
    let leggings = document.getElementById("leggings-choice").value;
    let boots = document.getElementById("boots-choice").value;
    let ring1 = document.getElementById("ring1-choice").value;
    let ring2 = document.getElementById("ring2-choice").value;
    let bracelet = document.getElementById("bracelet-choice").value;
    let necklace = document.getElementById("necklace-choice").value;
    let weapon = document.getElementById("weapon-choice").value;
    if(helmet===""){
        helmet = "No Helmet";
    }
    if(chestplate===""){
        chestplate = "No Chestplate";
    }
    if(leggings===""){
        leggings = "No Leggings";
    }
    if(boots===""){
        boots = "No Boots";
    }
    if(ring1===""){
        ring1 = "No Ring 1";
    }
    if(ring2===""){
        ring2 = "No Ring 2";
    }
    if(bracelet===""){
        bracelet = "No Bracelet";
    }
    if(necklace===""){
        necklace = "No Necklace";
    }
    if(weapon===""){
        weapon = "No Weapon";
    }
    player_build = new Build(
        106,
        itemMap.get(helmet),
        itemMap.get(chestplate),
        itemMap.get(leggings),
        itemMap.get(boots),
        itemMap.get(ring1),
        itemMap.get(ring2),
        itemMap.get(bracelet),
        itemMap.get(necklace),
        itemMap.get(weapon),
        );
    console.log(player_build.toString());

    let equip_order_text = "Equip order: <br>";
    for (const item of player_build.equip_order) {
        equip_order_text += item.displayName + "<br>";
    }
    setHTML("build-order", equip_order_text);
    
    player_build.base_skillpoints;
    let skillpoints = player_build.total_skillpoints;
    setValue("str-skp", skillpoints[0]);
    setValue("dex-skp", skillpoints[1]);
    setValue("int-skp", skillpoints[2]);
    setValue("def-skp", skillpoints[3]);
    setValue("agi-skp", skillpoints[4]);
    console.log(skillpoints);
    player_build.assigned_skillpoints;

    setHTML("summary-box", "Summary: Assigned "+player_build.assigned_skillpoints+" skillpoints.");

    setHTML("build-helmet", expandedItemToString(expandItem(player_build.helmet)));
    setHTML("build-chestplate", expandedItemToString(expandItem(player_build.chestplate)));
    setHTML("build-leggings", expandedItemToString(expandItem(player_build.helmet)));
    setHTML("build-boots", expandedItemToString(expandItem(player_build.helmet)));
    setHTML("build-ring1", expandedItemToString(expandItem(player_build.ring1)));
    setHTML("build-ring2", expandedItemToString(expandItem(player_build.ring2)));
    setHTML("build-bracelet", expandedItemToString(expandItem(player_build.bracelet)));
    setHTML("build-necklace", expandedItemToString(expandItem(player_build.necklace)));
    setHTML("build-weapon", expandedItemToString(expandItem(player_build.weapon)));
}
/*  Helper function that gets stats ranges for wearable items.
    @param item - an item in Object format.
*/
function expandItem(item){
    let minRolls = new Map();
    let maxRolls = new Map();
    let expandedItem = new Map();
    if(item.fixID){ //The item has fixed IDs.
        expandedItem.set("fixID",true);
        for (const id in rolledIDs){ //all rolled IDs are numerical
            if(item[rolledIDs[id]]){
                minRolls.set(rolledIDs[id],item[rolledIDs[id]]);
                maxRolls.set(rolledIDs[id],item[rolledIDs[id]]);
            }
        }
        for (id in nonRolledIDs){
            if(item[nonRolledIDs[id]]){
                expandedItem.set(nonRolledIDs[id],item[nonRolledIDs[id]]);
            }
        }
    }else{ //The item does not have fixed IDs.
        for (const id in rolledIDs){
            console.log(id);
            if(item[rolledIDs[id]]){
                if(item[rolledIDs[id]] > 0){ // positive rolled IDs                   
                    minRolls.set(rolledIDs[id],item[rolledIDs[id]]*0.3);
                    maxRolls.set(rolledIDs[id],item[rolledIDs[id]]*1.3);
                }else if(item[rolledIDs[id]] < 0){ //negative rolled IDs
                    minRolls.set(rolledIDs[id],item[rolledIDs[id]]*1.3);
                    maxRolls.set(rolledIDs[id],item[rolledIDs[id]]*0.7);
                }else{//Id = 0
                    minRolls.set(rolledIDs[id],0);
                    maxRolls.set(rolledIDs[id],0);
                }
            }
        }
        for (const id in nonRolledIDs){
            if(item[nonRolledIDs[id]]){
                expandedItem.set(nonRolledIDs[id],item[nonRolledIDs[id]]);
            }
        }
    }
    expandedItem.set("minRolls",minRolls);
    expandedItem.set("maxRolls",maxRolls);
    console.log(expandedItem)
    return expandedItem;
}
/*  A second helper function that takes items from expandItem() and stringifies them.
    @param item - a map with non-rolled Ids as normal key:value pairs and all rolled IDs as 2 separate key:value pairs in the minRoll and maxRoll keys that are mapped to maps.
    TODO: write the function
*/
function expandedItemToString(item){
    console.log(item);
    let ids = ["lvl", "classReq","strReq", "dexReq", "intReq", "defReq","agiReq", "nDam", "eDam", "tDam", "wDam", "tDam", "aDam", "atkSpd", "hp", "eDef", "tDef", "wDef", "fDef", "aDef", "str", "dex", "int", "agi", "def", "hpBonus", "hprRaw", "hprPct", "sdRaw", "sdPct", "mdRaw", "mdPct", "mr", "ms", "ref", "ls", "poison", "thorns", "exploding", "spd", "atkTier",  "eDamPct", "tDamPct", "wDamPct", "fDamPct", "aDamPct", "eDefPct", "tDefPct", "wDefPct", "fDefPct", "aDefPct", "spPct1", "spRaw1", "spPct2", "spRaw2", "spPct3", "spRaw3", "spPct4", "spRaw4", "rainbowRaw", "sprint", "sprintReg", "jh", "xpb", "lb", "lq", "spRegen", "eSteal", "gXp", "gSpd", "slots", "set", "quest", "restrict"];
    let idPrefixes = {"lvl":"Combat Level Min: ", "classReq":"Class Req: ","strReq":"Strength Min: ","dexReq":"Dexterity Min: ","intReq":"Intelligence Min: ","defReq":"Defense Min: ","agiReq":"Agility Min: ", "nDam":"Neutral Damage: ", "eDam":"Earth Damage: ", "tDam":"Thunder Damage: ", "wDam":"Water Damage: ", "fDam":"Fire Damage: ", "aDam":"Air Damage: ", "atkSpd":"Attack Speed: ", "hp":"Health: ", "eDef":"Earth Defense: ", "tDef":"Thunder Defense: ", "wDef":"Water Defense: ", "fDef":"Fire Defense: ", "aDef":"Air Defense: ", "str":"Strength: ", "dex":"Dexterity: ", "int":"Intelligence: ", "def":"Defense: ","agi":"Agility: ", "hpBonus":"Health Bonus: ", "hprRaw":"Health Regen Raw: ", "hprPct":"Health Regen %: ", "sdRaw":"Raw Spell Damage: ", "sdPct":"Spell Damage %: ", "mdRaw":"Main Attack Neutral Damage: ", "mdPct":"Main Attack Damage %: ", "mr":"Mana Regen: ", "ms":"Mana Steal: ", "ref":"Reflection: ", "ls":"Life Steal: ", "poison":"Poison: ", "thorns":"Thorns: ", "exploding":"Expoding: ", "spd":"Walk Speed Bonus: ", "atkTier":"Attack Speed Bonus: ",  "eDamPct":"Earth Damage %: ", "tDamPct":"Thunder Damage %: ", "wDamPct":"Water Damage %: ", "fDamPct":"Fire Damage %: ", "aDamPct":"Air Damage %: ", "eDefPct":"Earth Defense %: ", "tDefPct":"Thunder Defense %: ", "wDefPct":"Water Defense %: ", "fDefPct":"Fire Defense %: ", "aDefPct":"Air Defense %: ", "spPct1":"1st Spell Cost %: ", "spRaw1":"1st Spell Cost Raw: ", "spPct2":"2nd Spell Cost %: ", "spRaw2":"2nd Spell Cost Raw: ", "spPct3":"3rd Spell Cost %: ", "spRaw3":"3rd Spell Cost Raw: ", "spPct4":"4th Spell Cost %: ", "spRaw4":"4th Spell Cost Raw: ", "rainbowRaw":"Rainbow Spell Damage Raw: ", "sprint":"Sprint Bonus: ", "sprintReg":"Sprint Regen Bonus: ", "jh":"Jump Height: ", "xpb":"Combat XP Bonus: ", "lb":"Loot Bonus: ", "lq":"Loot Quality: ", "spRegen":"Soul Point Regen: ", "eSteal":"Stealing: ", "gXp":"Gathering XP Bonus: ", "gSpd":"Gathering Speed Bonus: ", "slots":"Powder Slots: ", "set":"This item belongs to the ", "quest":"This item is from the quest", "restrict":""};
    let idSuffixes = {"lvl":"", "classReq":"","strReq":"","dexReq":"","intReq":"","defReq":"","agiReq":"", "nDam":"", "eDam":"", "tDam":"", "wDam":"", "fDam":"", "aDam":"", "atkSpd":"", "hp":"", "eDef":"", "tDef":"", "wDef":"", "fDef":"", "aDef":"", "str":"", "dex":"", "int":"", "def":"","agi":"", "hpBonus":"", "hprRaw":"", "hprPct":"%", "sdRaw":"", "sdPct":"%", "mdRaw":"", "mdPct":"%", "mr":"/4s", "ms":"/4s", "ref":"%", "ls":"/4s", "poison":"/3s", "thorns":"%", "exploding":"%", "spd":"%", "atkTier":" tier",  "eDamPct":"%", "tDamPct":"%", "wDamPct":"%", "fDamPct":"%", "aDamPct":"%", "eDefPct":"%", "tDefPct":"%", "wDefPct":"%", "fDefPct":"%", "aDefPct":"%", "spPct1":"%", "spRaw1":"", "spPct2":"%", "spRaw2":"", "spPct3":"%", "spRaw3":"", "spPct4":"%", "spRaw4":"", "rainbowRaw":"", "sprint":"%", "sprintReg":"%", "jh":"", "xpb":"%", "lb":"%", "lq":"%", "spRegen":"%", "eSteal":"%", "gXp":"%", "gSpd":"%", "slots":"", "set":" set.", "quest":".", "restrict":""};
    let itemString = "";
    itemString = itemString.concat(item.get("name"),"<br><br>");
    if(item.has("fixID") && item.get("fixID")){//fixed IDs
        for(i = 0; i < ids.length; i++){ //iterate the ids
            if(nonRolledIDs.includes(ids[i]) && item.get(ids[i])){//nonRolledID & non-0/non-null/non-und ID
                itemString = itemString.concat(idPrefixes[ids[i]]);
                itemString = itemString.concat(item.get(ids[i]), idSuffixes[ids[i]],"<br>");
            }
            if(rolledIDs.includes(ids[i])&& item.get("minRolls").get(ids[i]) && item.get("maxRolls").get(ids[i]) ){//rolled ID & non-0/non-null/non-und ID
                console.log("hi");
                itemString = itemString.concat(idPrefixes[ids[i]]);
                itemString = itemString.concat(idRound(item.get("minRolls").get(ids[i])), idSuffixes[ids[i]],"<br>");
            }//Just don't do anything if else
        }
    }else{//non-fixed IDs
        for(i = 0; i < ids.length; i++){ //iterate the ids
            if(nonRolledIDs.includes(ids[i]) && item.get(ids[i])){//nonRolledID & non-0/non-null/non-und ID
                itemString = itemString.concat(idPrefixes[ids[i]]);
                itemString = itemString.concat(item.get(ids[i]), idSuffixes[ids[i]],"<br>");
            }
            if(rolledIDs.includes(ids[i])&& item.get("minRolls").get(ids[i]) && item.get("maxRolls").get(ids[i]) ){//rolled ID & non-0/non-null/non-und ID
                console.log("hi");
                itemString = itemString.concat(idPrefixes[ids[i]]);
                itemString = itemString.concat(idRound(item.get("minRolls").get(ids[i])), idSuffixes[ids[i]], " -> ", idRound(item.get("maxRolls").get(ids[i])),idSuffixes[ids[i]],"<br>");
            }//Just don't do anything if else
        }
    }
    itemString = itemString.concat("<br>",item.get("tier")," ", item.get("type"));
    return itemString;
}
/*An independent helper function that rounds a rolled ID to the nearest integer OR brings the roll away from 0.
* @param id
*/
function idRound(id){
    rounded = Math.round(id);
    if(rounded == 0){
        return 1;
    }else{
        return rounded;
    }
}

function resetFields(){
    setValue("helmet-choice", "");
    setValue("helmet-powder", "");
    setValue("chestplate-choice", "");
    setValue("chestplate-powder", "");
    setValue("leggings-choice", "");
    setValue("leggings-powder", "");
    setValue("boots-choice", "");
    setValue("boots-powder", "");
    setValue("ring1-choice", "");
    setValue("ring2-choice", "");
    setValue("bracelet-choice", "");
    setValue("necklace-choice", "");
    setValue("weapon-choice", "");
    setValue("weapon-powder", "");
    setValue("str-skp", "");
    setValue("dex-skp", "");
    setValue("int-skp", "");
    setValue("def-skp", "");
    setValue("agi-skp", "");
}

load_init(init);
