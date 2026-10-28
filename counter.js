const coin = document.querySelector('#coin');
const coin_number = document.querySelector('#coin-number');
const older_coin_upgrade = document.querySelector('#older-coin-upgrade');
const older_coin_upgrade_cost_text = document.querySelector('#older-coin-upgrade .upgrade-cost');
const older_coin_upgrade_title = document.querySelector('#older-coin-upgrade .upgrade-title');
let coin_counter = 0;
let coin_increment = 1;
let coin_level = 0;
let older_coin_upgrade_cost = 10;

const coins_added = 10; // UPDATE WHEN NEW COIN IMGs ARE ADDED



// coin clicker
coin.addEventListener('click', () => {
    coin_counter += coin_increment;
    coin_number.innerHTML = coin_counter;
});

// upgrade 1 - older coin
older_coin_upgrade.addEventListener('click', () => {
    if (coin_counter >= older_coin_upgrade_cost && coin_level <= (coins_added - 2)) {
        coin_level ++;
        let coin_file_type = coin_level >= 3 ? '.jpg' : '.png' // after the first 3 they are all jpg
        coin.setAttribute('src', `images/coin${coin_level}${coin_file_type}`);
        
        coin_counter -= older_coin_upgrade_cost;
        coin_number.innerHTML = coin_counter;

        coin_increment *= 10;
        older_coin_upgrade_cost *= 10;
        older_coin_upgrade_cost_text.innerHTML = older_coin_upgrade_cost.toString().concat(' coins');
        older_coin_upgrade_title.innerHTML = `Older Coin ${coin_level + 1}`
        
    }
})


// upgrade 2 - auto clicker

