const battleLogic = require("../battle.js");

const hitCheck = battleLogic.hitCheck;
const battle = battleLogic.battle;
const battleQuiet = battleLogic.battleQuiet;

// Testing framework

let player = {
    name  : "Warrior",
    maxhp : 50,
    hp    : 50,
    maxmp : 10,
    mp    : 10,

    str: 15,
    dex: 10,
    int: 8,

    spd: 10,
    luk: 10,
    acc: 90,

    arm: 5,
    atk: 10
}

let enemy = {
    name : "Goblin",
    maxhp : 25,
    hp    : 25,
    maxmp : 0,
    mp    : 0,

    str: 15,
    dex: 8,
    int: 2,

    spd: 5,
    luk: 8,
    acc: 75,

    arm: 1,
    atk: 13
}

let crits = 0;
let hits = 0;
let misses = 0;
let totalDamage = 0;

let testTurn = async (rounds) => {

    for (let i = 0; i < rounds; i++) {
        await hitCheck(player, enemy).then((outcome) => {
            // console.log(outcome);
            switch (outcome.status) {
                case 0:
                    misses++;
                    break;
                case 1:
                    hits++;
                    break;
                case 2:
                    crits++;
                    break;
            }

            totalDamage += outcome.damage;
        });
    }
    console.log(`Criticals: ${crits} | Hits: ${hits} | Misses: ${misses}`);
    console.log(`Total damage ${totalDamage} | Average damage ${(totalDamage / rounds).toFixed(2)}`);
}

// testTurn(10000000);

// stack overflow comma adder
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function testFight(rounds, totals) {
    let wins = 0;
    let lose = 0;
    console.log(`Running ${numberWithCommas(rounds)} test battles...`);
    for (let i = 0; i < rounds; i++) {
        if (await battleQuiet(player, enemy)) {
            wins++;
            player.hp = player.maxhp;
            enemy.hp = enemy.maxhp;
        } else {
            lose++;
            player.hp = player.maxhp;
            enemy.hp = enemy.maxhp;
        }
    }
    if (totals) console.log(`\nWins  : ${wins}\nLosses: ${lose}`);
    console.log(`\nWin   : ${Math.round(wins / rounds * 100)}%\nLoss  : ${Math.round(lose / rounds * 100)}%`);
}

testFight(process.argv[2]);