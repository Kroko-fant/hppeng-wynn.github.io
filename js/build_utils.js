/*Turns the input amount of skill points into a float precision percentage.
* @param skp - the integer skillpoint count to be converted
*/
function skillPointsToPercentage(skp){
    if (skp<=0) {
        return 0.0;
    } else if (skp>=150) {
        skp = 150;
    }
    const r = 0.9908;
    return ((1 - Math.pow(r, skp + 1)) / (1 - r) - 1) / 100.0;
        //return (-0.0000000066695* Math.pow(Math.E, -0.00924033 * skp + 18.9) + 1.0771);
        //return(-0.0000000066695* Math.pow(Math.E, -0.00924033 * skp + 18.9) + 1.0771).toFixed(3);
    //return Math.min(Math.max(0.00,(-0.0000000066695* Math.pow(Math.E, -0.00924033 * skp + 18.9) + 1.0771)),.808); 
    //return clamp((-0.0000000066695* Math.pow(Math.E, -0.00924033 * skp + 18.9) + 1.0771), 0.00, 0.808);
}

/*Turns the input amount of levels into skillpoints available.
*
* @param level - the integer level count to be converted
*/
function levelToSkillPoints(level){
    if(level < 1){
        return 0;
    }else if(level >= 101){
        return 200;
    }else{
        return (level - 1) * 2;
    }
}

/*Turns the input amount of levels in to base HP.
* @param level - the integer level count to be converted
*/
function levelToHPBase(level){
    if(level < 1){ //bad level
        return this.levelToHPBase(1);
    }else if (level > 106){ //also bad level
        return this.levelToHPBase(106);
    }else{ //good level
        return 5*level + 5;
    }
}

const skp_order = ["str","dex","int","def","agi"];
const skill = ["Strength", "Dexterity", "Intelligence", "Defense", "Agility"];
const skp_elements = ["e","t","w","f","a"];
const damageClasses = ["Neutral","Earth","Thunder","Water","Fire","Air"];
// Set up item lists for quick access later.
const armorTypes = [ "helmet", "chestplate", "leggings", "boots" ];
const accessoryTypes = [ "ring", "bracelet", "necklace" ];
const weaponTypes = [ "wand", "spear", "bow", "dagger", "relik" ];
const consumableTypes = [ "potion", "scroll", "food"];
const tomeTypes = ["armorTome", "weaponTome", "guildTome", "dungeonTome", "gatheringTome", "slayingTome"]
const attackSpeeds = ["SUPER_SLOW", "VERY_SLOW", "SLOW", "NORMAL", "FAST", "VERY_FAST", "SUPER_FAST"];
const baseDamageMultiplier = [ 0.51, 0.83, 1.5, 2.05, 2.5, 3.1, 4.3 ];
//0.51, 0.82, 1.50, 2.05, 2.50, 3.11, 4.27
const classes = ["Warrior", "Assassin", "Mage", "Archer", "Shaman"];
const tiers = ["Normal", "Unique", "Rare", "Legendary", "Fabled", "Mythic", "Set", "Crafted"] //I'm not sure why you would make a custom crafted but if you do you should be able to use it w/ the correct powder formula
const types = armorTypes.concat(accessoryTypes).concat(weaponTypes).concat(consumableTypes).concat(tomeTypes).map(x => x.substring(0,1).toUpperCase() + x.substring(1));
//weaponTypes.push("sword");
//console.log(types)
let itemTypes = armorTypes.concat(accessoryTypes).concat(weaponTypes).concat(tomeTypes);

let elementIcons = ["\u2724","\u2726", "\u2749", "\u2739", "\u274b" ];
let skpReqs = skp_order.map(x => x + "Req");

let item_fields = [ "name", "displayName", "lore", "color", "tier", "set", "slots", "type", "material", "drop", "quest", "restrict", "nDam", "fDam", "wDam", "aDam", "tDam", "eDam", "atkSpd", "hp", "fDef", "wDef", "aDef", "tDef", "eDef", "lvl", "classReq", "strReq", "dexReq", "intReq", "defReq", "agiReq", "hprPct", "mr", "sdPct", "mdPct", "ls", "ms", "xpb", "lb", "ref", "str", "dex", "int", "agi", "def", "thorns", "expd", "spd", "atkTier", "poison", "hpBonus", "spRegen", "eSteal", "hprRaw", "sdRaw", "mdRaw", "fDamPct", "wDamPct", "aDamPct", "tDamPct", "eDamPct", "fDefPct", "wDefPct", "aDefPct", "tDefPct", "eDefPct", "fixID", "category", "spPct1", "spRaw1", "spPct2", "spRaw2", "spPct3", "spRaw3", "spPct4", "spRaw4", "rainbowRaw", "sprint", "sprintReg", "jh", "lq", "gXp", "gSpd", "id", "majorIds", "dmgMobs", "defMobs"];
let str_item_fields = [ "name", "displayName", "lore", "color", "tier", "set", "type", "material", "drop", "quest", "restrict", "category", "atkSpd" ]

//File reading for ID translations for JSON purposes
let reversetranslations = new Map();
let translations = new Map([["name", "name"], ["displayName", "displayName"], ["tier", "tier"], ["set", "set"], ["sockets", "slots"], ["type", "type"], ["dropType", "drop"], ["quest", "quest"], ["restrictions", "restrict"], ["damage", "nDam"], ["fireDamage", "fDam"], ["waterDamage", "wDam"], ["airDamage", "aDam"], ["thunderDamage", "tDam"], ["earthDamage", "eDam"], ["attackSpeed", "atkSpd"], ["health", "hp"], ["fireDefense", "fDef"], ["waterDefense", "wDef"], ["airDefense", "aDef"], ["thunderDefense", "tDef"], ["earthDefense", "eDef"], ["level", "lvl"], ["classRequirement", "classReq"], ["strength", "strReq"], ["dexterity", "dexReq"], ["intelligence", "intReq"], ["agility", "agiReq"], ["defense", "defReq"], ["healthRegen", "hprPct"], ["manaRegen", "mr"], ["spellDamage", "sdPct"], ["damageBonus", "mdPct"], ["lifeSteal", "ls"], ["manaSteal", "ms"], ["xpBonus", "xpb"], ["lootBonus", "lb"], ["reflection", "ref"], ["strengthPoints", "str"], ["dexterityPoints", "dex"], ["intelligencePoints", "int"], ["agilityPoints", "agi"], ["defensePoints", "def"], ["thorns", "thorns"], ["exploding", "expd"], ["speed", "spd"], ["attackSpeedBonus", "atkTier"], ["poison", "poison"], ["healthBonus", "hpBonus"], ["soulPoints", "spRegen"], ["emeraldStealing", "eSteal"], ["healthRegenRaw", "hprRaw"], ["spellDamageRaw", "sdRaw"], ["damageBonusRaw", "mdRaw"], ["bonusFireDamage", "fDamPct"], ["bonusWaterDamage", "wDamPct"], ["bonusAirDamage", "aDamPct"], ["bonusThunderDamage", "tDamPct"], ["bonusEarthDamage", "eDamPct"], ["bonusFireDefense", "fDefPct"], ["bonusWaterDefense", "wDefPct"], ["bonusAirDefense", "aDefPct"], ["bonusThunderDefense", "tDefPct"], ["bonusEarthDefense", "eDefPct"], ["type", "type"], ["identified", "fixID"], ["skin", "skin"], ["category", "category"], ["spellCostPct1", "spPct1"], ["spellCostRaw1", "spRaw1"], ["spellCostPct2", "spPct2"], ["spellCostRaw2", "spRaw2"], ["spellCostPct3", "spPct3"], ["spellCostRaw3", "spRaw3"], ["spellCostPct4", "spPct4"], ["spellCostRaw4", "spRaw4"], ["rainbowSpellDamageRaw", "rainbowRaw"], ["sprint", "sprint"], ["sprintRegen", "sprintReg"], ["jumpHeight", "jh"], ["lootQuality", "lq"], ["gatherXpBonus", "gXp"], ["gatherSpeed", "gSpd"]]);
//does not include dmgMobs (wep tomes) and defMobs (armor tomes)
for (const [k, v] of translations) {
    reversetranslations.set(v, k);
}

console.log(translations);
