const inquirer = require('inquirer');
const playerDoc = require('./player.js');

const Race = playerDoc.race;
const Role = playerDoc.role;
const Player = playerDoc.player;

var begin = [
    {
        type: 'confirm',
        name: 'start',
        message: ' Are you ready to begin your adventure?',
        default: false
    }];

var characterCreation = [
    {
        type: 'input',
        name: 'name',
        message: ' What is your name?',
    },
    {
        type: 'list',
        name: 'race',
        message: ' Select your race.',
        choices: ['Human', 'Dwarf', 'Elf', 'Demon' ],
    },
    {
        type: 'list',
        name: 'class',
        message: ' Select your class.',
        choices: ['Knight', 'Thief', 'Paladin', 'Mage' ],
    },
]

var questions = [
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: [
            'Large', 'Medium', 'Small'
        ],
        filter: (val) => {
            return val.toLowerCase();
        }
    }, {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number
    }, {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
            {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese'
            }, {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed'
            }, {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian'
            }
        ]
    }, {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke']
    }, {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!'
    }, {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: [
            'cake', 'fries'
        ],
        when: function (answers) {
            return answers.comments !== 'Nope, all good!';
        }
    }
];


function startGame() {
    console.log('\n');
    console.log('           _                                             _         ');
    console.log(`          ╱0╲                                           ╱0╲        `);
    console.log(`  ┌o┐ ┌o┐ ╲O╱ ┌o┐ ┌o┐                           ┌o┐ ┌o┐ ╲O╱ ┌o┐ ┌o┐`);
    console.log(`  ╞╪╧═╧╪╧══╩══╧╪╧═╧╪╡  Welcome to King's Claim  ╞╪╧═╧╪╧══╩══╧╪╧═╧╪╡`);
    console.log(`  └═────═══─═══────═┘                           └═────═══─═══────═┘`);
    console.log('\n');
    inquirer
        .prompt(begin)
        .then(answer => {
            if (answer.start) {
                console.log('\n');
                createCharacter();
            } else {
                console.log('Okay bye!');
            }
        });
}

startGame();

function createCharacter() {
    inquirer
        .prompt(characterCreation)
        .then(answer => {
            console.log(answer);
            // name, hp, mp, str, dex, int, spd, luk, acc, arm, atk
            //  1    2   3    4    5    6    7    8    9   10   11
            let Human  = new Race("Human", 5, 5, 1, 1, 1, 1, 1, 0, 0, 0);
            let Knight = new Role("Knight", 10, 10, 10, 0, 0, 0, 0, -5, 3, 5);
            var player = new Player(cap(answer.name), Human, Knight);

            for (var x in player) {
                if (x === "maxhp" || x === "maxmp" || x === "acc");
                else console.log("   " + cap(x) + ": " + player[x]);
            }
        });
}

// Capitalize first letter
function cap(string) {
    return string.split('')[0].toUpperCase() + string.substr(1);
}

// inquirer
//     .prompt(questions)
//     .then(answers => {
//         console.log('\nOrder receipt:');
//         console.log(JSON.stringify(answers, null, '  '));
//     });