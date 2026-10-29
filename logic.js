// COIN CLICKER
const coin_img = document.querySelector('#coin-img');
const coin_number = document.querySelector('#coin-number');

const start_coins = 0;
let coin_counter = start_coins;
let coin_increment = 1;

function update_coins() {
    coin_number.innerHTML = coin_counter;
}

coin_img.addEventListener('click', () => {
    coin_counter += coin_increment;
    update_coins();
});


// UPGRADE MENU TOGGLE
const upgrade_menue_toggle =document.querySelector('.upgrade-menu-toggle');
const sidebar = document.querySelector('.sidebar');

upgrade_menue_toggle.addEventListener('click', () => {
    upgrade_menue_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});


// UPGRADES

// NOT ENOUGH MONEY MODAL
const broke_modal_container = document.querySelector('#broke-modal-container');
const close_broke_modal = document.querySelector('#close-broke-modal');

close_broke_modal.addEventListener('click', () => {
    broke_modal_container.classList.remove('show');
});

function show_broke_modal() {
    broke_modal_container.classList.add('show');
}



const older_coin_upgrade = document.querySelector('#older-coin-upgrade');
const older_coin_upgrade_cost_text = document.querySelector('#older-coin-upgrade .upgrade-cost');
const older_coin_upgrade_title = document.querySelector('#older-coin-upgrade .upgrade-title');
let coin_level = 0;
let older_coin_upgrade_cost = 10;

const coins_added = 10; // UPDATE WHEN NEW COIN IMGs ARE ADDED

// upgrade 1 - older coin
older_coin_upgrade.addEventListener('click', () => {
    if (coin_counter >= older_coin_upgrade_cost) {
        
// -------------------------------- TODO: show no more images and deactivate if ran out of images ----------------------------------------------------
        coin_level ++;
        let coin_file_type = coin_level >= 3 ? '.jpg' : '.png' // after the first 3 they are all jpg
        coin_img.setAttribute('src', `images/coin${coin_level}${coin_file_type}`);
        
        coin_counter -= older_coin_upgrade_cost;
        coin_number.innerHTML = coin_counter;

        coin_increment *= 10;
        older_coin_upgrade_cost *= 10;
        older_coin_upgrade_cost_text.innerHTML = older_coin_upgrade_cost.toString().concat(' coins');
        older_coin_upgrade_title.innerHTML = `Older Coin ${coin_level + 1}`
        
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
    }
});

// every second add the autoclicker profits
setInterval(() => {
    coin_counter += auto_clicker_increment;
    update_coins();
}, auto_clicker_delay);


