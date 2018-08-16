function hitCheck(attacker, defender) {
    // attacker atk, acc, luk
    // enemy hp, def
    let attempt  = Math.floor(Math.random() * 100) + 1;
    let critical = Math.floor(Math.random() * 100) + 1;

    let result = {
        status: 0,
        statusText: "",
        damage: 0
    };

    // combat update

    // Status response codes:
    //      0 = miss
    //      1 = hit
    //      2 = critical

    if (attacker.acc > attempt) {
        
        if (attacker.luk * 2 > critical) {
            result.damage = attacker.atk * 2 - defender.arm;
            result.status = 2;
            result.statusText = "critically hit";
        } else {
            result.damage = attacker.atk - defender.arm;
            result.status = 1;
            result.statusText = "hit";
        }
    } else {
        result.damage = 0;
        result.status = 0;
        result.statusText = "missed";
    }
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

// hitCheck(player, enemy).then((x) => {
//     console.log(x);
// });


async function battle(player, enemy) {
    var round = 0;
    while (player.hp > 0 && enemy.hp > 0) {
        round++;
        console.log(`Round: ${round}`);
        console.log(`Player HP: ${player.hp}/${player.maxhp} | Enemy HP: ${enemy.hp}/${enemy.maxhp}`);
        if (player.spd > enemy.spd) {
            await hitCheck(player, enemy)
                .then((result) => {
                    enemy.hp -= result.damage;
                    console.log(`${player.name} has ${result.statusText} the ${enemy.name} for ${result.damage}.`);
                });

            if (player.hp > 0 || enemy.hp > 0) {
                await hitCheck(enemy, player)
                    .then((result) => {
                        player.hp -= result.damage;
                        console.log(`${enemy.name} has ${result.statusText} the ${player.name} for ${result.damage}.`);
                    });
            }
        } else {
            await hitCheck(player, enemy)
                .then((result) => {
                    enemy.hp -= result.damage;
                    console.log(`${player.name} has ${result.statusText} the ${enemy.name} for ${result.damage}.`);
                });
            
            if (player.hp > 0 || enemy.hp > 0) {
                await hitCheck(enemy, player)
                    .then((result) => {
                        player.hp -= result.damage;
                        console.log(`${enemy.name} has ${result.statusText} the ${player.name} for ${result.damage}.`);
                    });
            }
        }
    }

    if (player.hp <= 0) {
        console.log(`\n${player.name} has been defeated by ${enemy.name}.`);
        console.log('Game over.');
        return false;
    } else if (enemy.hp <= 0) {
        console.log(`\n${player.name} has defeated ${enemy.name}.`);
        return true;
    }
}

async function battleQuiet(player, enemy) {
    var round = 0;
    while (player.hp > 0 && enemy.hp > 0) {
        round++;
        if (player.spd > enemy.spd) {
            await hitCheck(player, enemy)
                .then((result) => {
                    enemy.hp -= result.damage;
                });

            if (player.hp > 0 || enemy.hp > 0) {
                await hitCheck(enemy, player)
                    .then((result) => {
                        player.hp -= result.damage;
                    });
            }
        } else {
            await hitCheck(player, enemy)
                .then((result) => {
                    enemy.hp -= result.damage;
                });
            
            if (player.hp > 0 || enemy.hp > 0) {
                await hitCheck(enemy, player)
                    .then((result) => {
                        player.hp -= result.damage;
                    });
            }
        }
    }

    if (player.hp <= 0) {
        return false;
    } else if (enemy.hp <= 0) {
        return true;
    }
}

module.exports = {
    hitCheck: hitCheck,
    battle: battle,
    battleQuiet: battleQuiet
};
