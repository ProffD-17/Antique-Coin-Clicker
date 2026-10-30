// COIN CLICKER
const coin_img = document.querySelector('#coin-img');
const coin_number = document.querySelector('#coin-number');

const start_coins = 10000000000000;
let coin_counter = start_coins;
let coin_increment = 1;
let multiplier = 1;

// GENERAL USE MODAL
const general_modal_container = document.querySelector('#general-modal-container');
const close_general_modal = document.querySelector('#close-general-modal');
const general_modal_text = document.querySelector('#modal-info');

close_general_modal.addEventListener('click', () => {
    general_modal_container.classList.remove('show');
    general_modal_text = '';
});

function show_general_modal(text) {
    general_modal_container.classList.add('show');
    general_modal_text.innerHTML = text;
}

// updates the coin number on screen
function update_coins() {
    coin_number.innerHTML = coin_counter;
}
update_coins();


// basic coin clicker
coin_img.addEventListener('click', () => {
    coin_counter += coin_increment * multiplier;
    update_coins();
});


// UPGRADE MENU TOGGLE
const upgrade_menue_toggle =document.querySelector('.upgrade-menu-toggle');
const sidebar = document.querySelector('.sidebar');

upgrade_menue_toggle.addEventListener('click', () => {
    upgrade_menue_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});


// NOT ENOUGH MONEY MODAL
const broke_modal_container = document.querySelector('#broke-modal-container');
const close_broke_modal = document.querySelector('#close-broke-modal');

close_broke_modal.addEventListener('click', () => {
    broke_modal_container.classList.remove('show');
});

function show_broke_modal() {
    broke_modal_container.classList.add('show');
}


// UPGRADES
// upgrade 1 - older coin
const older_coin_upgrade = document.querySelector('#older-coin-upgrade');
const older_coin_upgrade_cost_text = document.querySelector('#older-coin-upgrade .upgrade-cost');
const older_coin_upgrade_title = document.querySelector('#older-coin-upgrade .upgrade-title');
let coin_level = 0;
let older_coin_upgrade_cost = 10;
let older_coin_upgrade_maxed = false;

const coin_imgs = 10; // UPDATE WHEN NEW COIN IMGs ARE ADDED

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
        older_coin_upgrade_cost_text.innerHTML = older_coin_upgrade_cost.toString().concat(' coins');
        older_coin_upgrade_title.innerHTML = `Older Coin ${coin_level + 1}`

        if (coin_level === coin_imgs - 1) {
            older_coin_upgrade_cost_text.innerHTML = 'Max level';
            older_coin_upgrade_maxed = true;
        }
        
        show_fact();
    } else {
        show_broke_modal();
    }
})

// fun fact on each coin upgrade
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

const fun_fact = document.querySelector('#fun-fact');
const fact_modal_container = document.querySelector('#fact-modal-container');
const fact_modal = document.querySelector('#fact-modal');
const fact_modal_close = document.querySelector('#close-fact-modal');

function show_fact() {
    // choose a random fact
    let random_fact = antique_coin_facts[get_random_int(antique_coin_facts.length - 1)];
    fun_fact.innerHTML = `${random_fact}`;
    fact_modal_container.classList.add('show');
}

fact_modal_close.addEventListener('click', () => {
    fact_modal_container.classList.remove('show');
});



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
        auto_clicker_upgrade_cost_text.innerHTML = `${auto_clicker_upgrade_cost} Coins`;

        auto_clicker_level ++;
        auto_clicker_upgrade_title.innerHTML =`Goblin ${auto_clicker_level + 1}`;

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

// every second add the autoclicker profits
setInterval(() => {
    coin_counter += auto_clicker_increment * multiplier;
    update_coins();
}, auto_clicker_delay);


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
        multiplier_upgrade_cost_text.innerHTML = `${multipler_upgrade_cost} coins`;

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
let win_chance = 90/100;
let win_multiplier = 2;

gamble_btn.addEventListener('click', () => {
    // check for invalid input
    let gamble_amount = gamble_amount_input.value;
    if (gamble_amount <= 0) {
        show_general_modal("You can't bet that amount.");
        return;
    }
    if (gamble_amount > coin_counter){
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

    }
});
