// COIN CLICKER
const coin_img = document.querySelector('#coin-img');
const coin_number = document.querySelector('#coin-number');

let coin_counter = 0;
let coin_increment = 1;

coin_img.addEventListener('click', () => {
    coin_counter += coin_increment;
    coin_number.innerHTML = coin_counter;
});


// UPGRADE MENU TOGGLE
const upgrade_menue_toggle =document.querySelector('.upgrade-menu-toggle');
const sidebar = document.querySelector('.sidebar');

upgrade_menue_toggle.addEventListener('click', () => {
    upgrade_menue_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});


// UPGRADES
const older_coin_upgrade = document.querySelector('#older-coin-upgrade');
const older_coin_upgrade_cost_text = document.querySelector('#older-coin-upgrade .upgrade-cost');
const older_coin_upgrade_title = document.querySelector('#older-coin-upgrade .upgrade-title');
let coin_level = 0;
let older_coin_upgrade_cost = 10;

const coins_added = 10; // UPDATE WHEN NEW COIN IMGs ARE ADDED

// upgrade 1 - older coin
older_coin_upgrade.addEventListener('click', () => {
    if (coin_counter >= older_coin_upgrade_cost && coin_level <= (coins_added - 2)) {
        coin_level ++;
        let coin_file_type = coin_level >= 3 ? '.jpg' : '.png' // after the first 3 they are all jpg
        coin_img.setAttribute('src', `images/coin${coin_level}${coin_file_type}`);
        
        coin_counter -= older_coin_upgrade_cost;
        coin_number.innerHTML = coin_counter;

        coin_increment *= 10;
        older_coin_upgrade_cost *= 10;
        older_coin_upgrade_cost_text.innerHTML = older_coin_upgrade_cost.toString().concat(' coins');
        older_coin_upgrade_title.innerHTML = `Older Coin ${coin_level + 1}`
        
    }
})


// upgrade 2 - auto clicker
const auto_clicker_upgrade_button = document.querySelector('#auto-clicker-upgrade');
const auto_clicker_upgrade_title = document.querySelector('#auto-clicker-upgrade .upgrade-title');
const auto_clicker_upgrade_cost_text = document.querySelector('#auto-clicker-upgrade .upgrade-cost');

let auto_clicker_level = 0;
let auto_clicker_upgrade_cost = 100;




