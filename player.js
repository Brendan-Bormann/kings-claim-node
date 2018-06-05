// ━━━━━━━━━━━━━━━ races ━━━━━━━━━━━━━━━

//  human;
//  elf;
//  dwarf;
//  halfling;
//  gnome;
//  skaven;
//  undead;
//  insects;
//  orc;
//  minotaur;
//  demon;
//  troll;
//  darkElf;
//  centaur;
//  lizardFolk;
//  vampire;

class Race {
    constructor(name, hp, mp, str, dex, int, spd, luk, acc, arm, atk) {
        this.name = name;
        // total health
        this.maxhp = 0 + hp;
        // current health
        this.hp = this.maxhp;
        // total mana
        this.maxmp = 0 + mp;
        // current mana
        this.mp = this.maxmp;

        this.str = 0 + str;
        this.dex = 0 + dex;
        this.int = 0 + int;
        // Speed is compared to determine who attacks first
        this.spd = 0 + spd;
        // Each point of luck increases crit chance by 2
        // crits double damage
        this.luk = 0 + luk;
        // Accuracy out of 100 ... 75 is just 75%
        this.acc = 0 + acc;
        // Reduces damage taken by the value
        this.arm = 0 + arm;
        // Value of basic attack
        this.atk = 0 + atk;
    }
}

// ━━━━━━━━━━━━━━━ roles ━━━━━━━━━━━━━━━

class Role {
    constructor(name, hp, mp, str, dex, int, spd, luk, acc, arm, atk) {
        this.name = name;
        // total health
        this.hp = 0 + hp;
        // total mana
        this.mp = 0 + mp;

        this.str = 0 + str;
        this.dex = 0 + dex;
        this.int = 0 + int;
        // Speed is compared to determine who attacks first
        this.spd = 0 + spd;
        // Each point of luck increases crit chance by 2
        // crits double damage
        this.luk = 0 + luk;
        // Accuracy out of 100 ... 75 is just 75%
        this.acc = 0 + acc;
        // Reduces damage taken by the value
        this.arm = 0 + arm;
        // Value of basic attack
        this.atk = 0 + atk;
    }
}

// ━━━━━━━━━━━━━━ Player ━━━━━━━━━━━━━━━

class Player {
    constructor(name, race, role) {
        // Info about character
        this.name = name;
        this.race = race.name;
        this.role = role.name;
        // -------------------------------
        // total health
        this.maxhp = 25 + race.hp + role.hp;
        // current health
        this.hp = this.maxhp;
        // total mana
        this.maxmp = 10 + race.mp + role.mp;
        // current mana
        this.mp = this.maxmp;
        // -------------------------------
        // Reduces damage taken by the value
        this.arm = 0 + race.arm + role.arm;
        // Value of basic attack
        this.atk = 10;
        // -------------------------------
        this.str = 5 + race.str + role.str;
        this.dex = 5 + race.dex + role.dex;
        this.int = 5 + race.int + role.int;
        // -------------------------------
        // Speed is compared to determine who attacks first
        this.spd = 5  + race.spd + role.spd;
        // Each point of luck increases crit chance by 2 -- crits double damage
        this.luk = 0  + race.luk + role.luk;
        // Accuracy out of 100 ... 75 is just 75%
        this.acc = 75 + race.acc + role.luk;
        // -------------------------------
        // this.modify = (stat, value) => {
        //     this[stat] += value;
        // }
    }
}

module.exports = {
    race: Race,
    role: Role,
    player: Player
};

// name, hp, mp, str, dex, int, spd, luk, acc, arm, atk
//  1    2   3    4    5    6    7    8    9   10   11

// let Human  = new Race("Human", 5, 5, 1, 1, 1, 1, 1, 0, 0, 0);
// let Knight = new Role("Knight", 10, 10, 10, 0, 0, 0, 0, -5, 3, 5);

// let guy = new Player("Guy", Human, Knight);

// function logPlayer() {
//     for (var x in guy) {
//         console.log(x + ": " + guy[x]);
//     }
// }

// logPlayer();

// console.log(guy.moves[process.argv[2]]());



// let SirPooks = new Knight();

// console.log(SirPooks.moves[1]);