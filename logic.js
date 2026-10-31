// LOGIC FOR UPGRADES, CLICKING, GAMBLING, MODALS

// general variables
const START_COINS = 1000000000000000000000000000000000000000000000000000000000000000;
let coin_counter = START_COINS;
let coin_increment = 1;
let multiplier = 1;

// MODALS

// MODAL
const modal_container = document.querySelector('#modal-container');
const close_modal_button = document.querySelector('#close-modal');
const modal_text = document.querySelector('#modal-info');
const modal_title = document.querySelector('#modal-title')
const modal = document.querySelector('#modal');


function close_modal() {
    modal_container.classList.remove('show');
    modal_title.innerHTML = '';
    modal_text.innerHTML = '';
    close_modal.innerHTML = '';
}
// close with button
close_modal_button.addEventListener('click', close_modal);
// close by clicking anywhere not on the modal
modal_container.addEventListener('click', close_modal);
// modal closing when it it clicked by not letting the modal contianer know think it has been clicked
modal.addEventListener('click', (event) => {
    event.stopPropagation();
});

function show_modal(title, text='', close_button_text='Close') {
    modal_container.classList.add('show');
    modal_title.innerHTML = title;
    modal_text.innerHTML = text;
    close_modal.innerHTML = close_button_text;
}

// fun facts
const antique_coin_facts = [
  "Some ancient Roman coins featured emperors who ruled for only a few months.",
  "The world's oldest coins appeared in ancient Lydia, around the 7th century BCE.",
  "Ancient Greek coins often featured gods, mythical creatures, and city symbols.",
  "Some Roman coins were used as propaganda to celebrate military victories and political achievements.",
  "Coin collecting is often called numismatics.",
  "Ancient coins were frequently made by striking metal blanks between engraved dies.",
  "Some antique coins have survived for over 2,000 years buried underground.",
  "The designs on old coins can reveal details about ancient clothing, hairstyles, and architecture.",
  "Certain ancient coins featured animals such as owls, lions, eagles, and dolphins.",
  "Roman emperors sometimes changed coin designs to promote new titles or religious beliefs.",
  "A coin's mint mark can help collectors identify where it was produced.",
  "Some ancient coins were made from electrum, a naturally occurring alloy of gold and silver.",
  "Coins discovered in shipwrecks can reveal ancient trade routes and maritime history.",
  "The condition of an antique coin can greatly affect its value to collectors.",
  "Some medieval coins had irregular shapes because they were hammered by hand rather than machine-made.",
  "Counterfeit coins have existed for thousands of years, making coin authentication an ancient challenge.",
  "The ancient Greek city of Athens issued famous silver coins featuring the goddess Athena and an owl.",
  "Some old coins contain tiny details that are visible only under magnification.",
  "A coin's patina is a surface layer that can develop over time through chemical reactions with its environment.",
  "Rare minting errors can make certain antique coins especially desirable to collectors.",
  "Coins can help historians determine the approximate age of archaeological sites.",
  "Some ancient rulers placed their own portraits on coins to make their image recognizable across their empires.",
  "Gold coins were often used for large payments and international trade because of their high value.",
  "The inscriptions on antique coins can preserve ancient languages, rulers' names, and historical titles.",
  "Two coins minted in the same year can have very different values depending on rarity, condition, and historical significance."
];

function show_fact() {
    // choose a random fact
    let random_fact = antique_coin_facts[get_random_int(antique_coin_facts.length - 1)];
    show_modal('Fun Fact', random_fact, 'OK . . .');
}

// NOT ENOUGH MONEY MODAL
function show_broke_modal() {
    show_modal('Your broke', 'Unfortunatley you dont have enough money to complete this action.', 'Close in disapointment');
}


// COIN CLICKER
const coin_img = document.querySelector('#coin-img');
const coin_number = document.querySelector('#coin-number');
const coin_number_sentence = document.querySelector('#coin-number-text');

coin_img.addEventListener('click', () => {
    coin_counter += coin_increment * multiplier;
    update_coins();
});


let suffixes = ['', 'K', 'M', 'B', 'T', 'Qu', 'Qi', 'Sex', 'Sep', 'Oct', 'Non', 'Dec', 'Und', 'Duod', 'Tred', 'Quattuord', 'Quind', 'Sexd', 'Septend', 'Octod', 'Novemd', 'Vig', 'Unvig', 'Duovig', 'Tresvig', 'Quattuorvig', 'Quinvig', 'Sexvig', 'Septenvig', 'Octovig', 'Novemvig', 'Trig'];

// updates the coin number on screen
function update_coins(coins=coin_counter, element=coin_number) {
    let duplicite = coins;
    let sufix_index = 0;
    while (duplicite >= 1000) {
        duplicite /= 1000;
        sufix_index ++;
    }
    if (sufix_index >= suffixes.length) {
        element.innerHTML = 'Too many to count, You win 🪙';
        show_modal('You win', 'Basicly there are too many coins to count so this is the end of the game');
        return;
    }
    duplicite = Math.round(duplicite * 100) / 100; // round to 2d.p.
    element.innerHTML = `${duplicite} ${suffixes[sufix_index]}`;
}
update_coins();


// UPGRADE MENU TOGGLE FOR MOBILE
const upgrade_menue_toggle =document.querySelector('.upgrade-menu-toggle');
const sidebar = document.querySelector('.sidebar');

upgrade_menue_toggle.addEventListener('click', () => {
    upgrade_menue_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});





// UPGRADES
// upgrade 1 - older coin
const older_coin_upgrade = document.querySelector('#older-coin-upgrade');
const older_coin_upgrade_cost_text = document.querySelector('#older-coin-upgrade .upgrade-cost');
const older_coin_upgrade_title = document.querySelector('#older-coin-upgrade .upgrade-title');
let coin_level = 0;
let older_coin_upgrade_cost = 10;
let older_coin_upgrade_maxed = false;

const COIN_IMGS = 10; // UPDATE WHEN NEW COIN IMGs ARE ADDED

older_coin_upgrade.addEventListener('click', () => {
    if (coin_counter >= older_coin_upgrade_cost) {
        if (older_coin_upgrade_maxed) {
            return;
        }

        coin_level ++;
        let coin_file_type = coin_level >= 3 ? '.jpg' : '.png' // after the first 3 they are all jpg
        coin_img.setAttribute('src', `images/coin${coin_level}${coin_file_type}`);
        
        coin_counter -= older_coin_upgrade_cost;
        coin_number.innerHTML = coin_counter;

        coin_increment *= 10;
        older_coin_upgrade_cost *= 10;
        update_coins(older_coin_upgrade_cost, older_coin_upgrade_cost_text);
        older_coin_upgrade_title.innerHTML = `Older Coin ${coin_level}`

        if (coin_level === COIN_IMGS - 1) {
            older_coin_upgrade_cost_text.innerHTML = 'Max level';
            older_coin_upgrade_maxed = true;
        }
        
        show_fact();
    } else {
        show_broke_modal();
    }
})





// upgrade 2 - auto clicker
const auto_clicker_upgrade_button = document.querySelector('#auto-clicker-upgrade');
const auto_clicker_upgrade_title = document.querySelector('#auto-clicker-upgrade .upgrade-title');
const auto_clicker_upgrade_cost_text = document.querySelector('#auto-clicker-upgrade .upgrade-cost');

let auto_clicker_level = 0;
let auto_clicker_upgrade_cost = 100;
let auto_clicker_increment = 0; // how much the autoclicker adds per second
let auto_clicker_delay = 1000; // in milliseconds

auto_clicker_upgrade_button.addEventListener('click', () => {
    if (auto_clicker_upgrade_cost <= coin_counter) {
        coin_counter -= auto_clicker_upgrade_cost;
        update_coins();
        auto_clicker_upgrade_cost *= 10;
        update_coins(auto_clicker_upgrade_cost, auto_clicker_upgrade_cost_text);

        auto_clicker_level ++;
        auto_clicker_upgrade_title.innerHTML =`Goblin ${auto_clicker_level}`;

        if (auto_clicker_increment > 0) {
            auto_clicker_increment *= 10;
        }
        else {
            auto_clicker_increment = 1;
        }
    } else {
        show_broke_modal();
        console.log('your broke');
    }
});

// upgrade 5 - goblin coffee
// makes the autoclicker delay smaller
const goblin_coffee_upgrade_button = document.querySelector('#goblin-coffee-upgrade');
const goblin_coffee_upgrade_title = document.querySelector('#goblin-coffee-upgrade .upgrade-title');
const goblin_coffee_upgrade_cost_text = document.querySelector('#goblin-coffee-upgrade .upgrade-cost');

let goblin_coffee_upgrade_cost = 10;
let goblin_coffee_upgrade_level = 0;
let goblin_coffee_maxed = false;
const GOBLIN_COFFEE_UPGRADE_MAX_LEVEL = 19; // starts at 1000ms and -50ms each time so min is 50ms for the click delay

goblin_coffee_upgrade_button.addEventListener('click', () => {
    if (coin_counter >= goblin_coffee_upgrade_cost && !goblin_coffee_maxed) {
        // make autoclicker quicker
        auto_clicker_delay -= 50;
        reset_auto_clicker();
        // make it more expensive
        goblin_coffee_upgrade_cost *= 10;
        update_coins(goblin_coffee_upgrade_cost, goblin_coffee_upgrade_cost_text);
        // update the title
        goblin_coffee_upgrade_level ++;
        goblin_coffee_upgrade_title.innerHTML = `Goblin Coffee ${goblin_coffee_upgrade_level}`;
        // make sure it cant go to 0 delay
        if (goblin_coffee_upgrade_level === GOBLIN_COFFEE_UPGRADE_MAX_LEVEL) {
            goblin_coffee_maxed = true;
            update_coins('Max', goblin_coffee_upgrade_cost_text);
        }
    }
});


// restart the setInterval function to update the interval
let auto_clicker_interval;

function reset_auto_clicker() {
    clearInterval(auto_clicker_interval);

    auto_clicker_interval = setInterval(() => {
        coin_counter += auto_clicker_increment * multiplier;
        update_coins();
        console.log('clicked');
    }, auto_clicker_delay);
}

reset_auto_clicker();


// upgrade 3 - coin multiplier
const multiplier_upgrade_button = document.querySelector('#multiplier-upgrade');
const multiplier_upgrade_title = document.querySelector('#multiplier-upgrade .upgrade-title');
const multiplier_upgrade_cost_text = document.querySelector('#multiplier-upgrade .upgrade-cost');

let multipler_upgrade_cost = 10000;

multiplier_upgrade_button.addEventListener('click', () => {
    if (multipler_upgrade_cost <= coin_counter) {
        console.log('logic activated');
        coin_counter -= multipler_upgrade_cost;
        update_coins();

        multipler_upgrade_cost *= 10;
        update_coins(multipler_upgrade_cost, multiplier_upgrade_cost_text);

        multiplier ++;
        multiplier_upgrade_title.innerHTML = `Multiplier ${multiplier}x`;
    } else {
        show_broke_modal();
    }
});

// random int function
function get_random_int(max) {
  return Math.floor(Math.random() * max);
}


// GAMBLING
const gamble_btn = document.querySelector('#gamble');
const gamble_amount_input = document.querySelector('#gamble-amount');
const win_chance_text = document.querySelector('#gamble-win-chance');
let win_chance = 1/100;
// updates the on screen win chance
function update_win_chance() {
    win_chance_text.innerHTML = `${Math.round(win_chance * 100)}% Win chance`;
}
update_win_chance();

let win_multiplier = 2;

gamble_btn.addEventListener('click', () => {
    // check for invalid input
    let gamble_amount = gamble_amount_input.value;
    if (gamble_amount <= 0) {
        show_modal("You can't bet that amount.");
        return;
    }
    if (gamble_amount > coin_counter) {
        show_broke_modal();
        return;
    }

    // take bet
    coin_counter -= gamble_amount;
    update_coins();

    if (Math.random() < win_chance) {
        // win
        let reward = gamble_amount * win_multiplier;
        coin_counter += reward;
        update_coins();
        show_modal('You Won!');
    } else {
        show_modal('You Lost.');
    }
});


// Gambling upgrades

// upgrade 4 - higher gambling win chance
const gamble_win_chance_upgrade = document.querySelector('#gamble-win-chance-upgrade');
const gamble_win_chance_upgrade_cost_text = document.querySelector('#gamble-win-chance-upgrade .upgrade-cost');

let gamble_win_chance_upgrade_cost = 10;
const WIN_CHANCE_MAX = 51;

gamble_win_chance_upgrade.addEventListener('click', () => {
    if (coin_counter >= gamble_win_chance_upgrade_cost) {
        // exit if max chance reached
        if (win_chance >= WIN_CHANCE_MAX/100) {
            return;
        }
        // take bet
        coin_counter -= gamble_win_chance_upgrade_cost;
        update_coins();
        // change chance +1%
        win_chance += 1/100;
        update_win_chance();
        // update cost
        gamble_win_chance_upgrade_cost *= 10;
        update_coins(gamble_win_chance_upgrade_cost, gamble_win_chance_upgrade_cost_text);
        if (win_chance >= WIN_CHANCE_MAX/100) {
            gamble_win_chance_upgrade_cost_text.innerHTML = 'MAX';
        }
    } else {
        show_broke_modal();
    }
});
