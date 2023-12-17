import controls from '../../constants/controls';
// Функція для розрахунку комбо удару
export function getCriticalHit(player) {
    const { attack } = player.fighter;

    const hitPower = attack * 2;

    return hitPower;
}
// Функція для розрахунку удару
export function getHitPower(player) {
    const { attack } = player.fighter;

    function criticalHitChance() {
        return Math.random() + 1;
    }

    return attack * criticalHitChance();
}
// Функція для розрахунку блоку

export function getBlockPower(player) {
    const { defense, isDefenced } = player.fighter;

    if (!isDefenced) return 0;

    function dodgeChance() {
        return Math.random() + 1;
    }

    return defense * dodgeChance();
}
// Функція для розрахунку урону

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return Math.max(Math.round(damage), 0);
}

// Функцыя бою
export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const playerOne = {
            keys: 0,
            isDefenced: false,
            fighter: firstFighter,
            curentHealth: firstFighter.health,
            healthBar: document.getElementById('left-fighter-indicator'),
            canUseFatality: true
        };
        const playerTwo = {
            keys: 0,
            isDefenced: false,
            fighter: secondFighter,
            curentHealth: secondFighter.health,
            healthBar: document.getElementById('right-fighter-indicator'),
            canUseFatality: true
        };

        // розрахунок HP після базової атаки
        function basicAttack(attacker, defencer) {
            const def = defencer;
            def.curentHealth -= getDamage(attacker, defencer);
        }
        // розрахунок HP після комбо атаки

        function criticalAttack(attacker, defencer) {
            const def = defencer;
            def.curentHealth -= getCriticalHit(attacker);
        }
        // Розрахунок довжини індикатора здоровья
        function changeFightersHelthIndicator(player) {
            const width = (player.curentHealth / player.fighter.health) * 100;
            const pl = player;
            pl.healthBar.style.width = `${width}%`;
        }
        // Обробник події KeyUp
        function HandleKeyUp(event) {
            if (event.code === controls.PlayerOneBlock) {
                playerOne.isDefenced = false;
            } else if (event.code === controls.PlayerTwoBlock) {
                playerTwo.isDefenced = false;
            } else if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne.keys -= 1;
            } else if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo.keys -= 1;
            }
        }
        // Видалення слухачів події після завершення бою
        function removeEventListners() {
            // eslint-disable-next-line no-use-before-define
            document.removeEventListener('keydown', HandleKeyDown);
            document.removeEventListener('keyup', HandleKeyUp);
        }
        // Функція перевірки завершення бою
        function checkFightersHealth() {
            if (playerOne.curentHealth <= 0) {
                removeEventListners();
                resolve(secondFighter);
            }
            if (playerTwo.curentHealth <= 0) {
                removeEventListners();
                resolve(firstFighter);
            }
            changeFightersHelthIndicator(playerOne);
            changeFightersHelthIndicator(playerTwo);
        }
        // Обробник події KeyDown
        function HandleKeyDown(event) {
            if (event.code === controls.PlayerOneBlock) {
                playerOne.isDefenced = true;
            } else if (event.code === controls.PlayerTwoBlock) {
                playerTwo.isDefenced = true;
            } else if (event.code === controls.PlayerOneAttack && !playerOne.isDefenced) {
                basicAttack(playerOne, playerTwo);
            } else if (event.code === controls.PlayerTwoAttack && !playerTwo.isDefenced) {
                basicAttack(playerTwo, playerOne);
            } else if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne.keys += 1;
                if (playerOne.keys === 3 && playerOne.canUseFatality) {
                    criticalAttack(playerOne, playerTwo);
                    playerOne.canUseFatality = false;
                    setTimeout(() => {
                        playerOne.canUseFatality = true;
                    }, 10000);
                }
            } else if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo.keys += 1;
                if (playerTwo.keys === 3 && playerTwo.canUseFatality) {
                    criticalAttack(playerTwo, playerOne);

                    playerTwo.canUseFatality = false;
                    setTimeout(() => {
                        playerTwo.canUseFatality = true;
                    }, 10000);
                }
            }
            checkFightersHealth();
        }
        // Слухачі натискання кнопок
        document.addEventListener('keydown', HandleKeyDown);
        document.addEventListener('keyup', HandleKeyUp);
    });
}
