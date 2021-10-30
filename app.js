//global functions

const randomDamge = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterhealth: 100,
			specialAttackCount: 0,
			healCount: 0,
			gameStatus: null,
			logMessages: [],
		};
	},
	watch: {
		//controling the status game
		//player lost
		playerHealth(value) {
			if (value <= 0) this.gameStatus = `Lost`;
			//draw
			if (value <= 0 && this.monsterhealth <= 0) this.gameStatus = `Draw`;

			// set the player health equal to 0
			if (value < 0) this.playerHealth = 0;
		},
		//player win
		monsterhealth(value) {
			//win
			if (value <= 0) this.gameStatus = `Win`;
			//draw
			if (value <= 0 && this.playerHealth <= 0) this.gameStatus = `Draw`;

			//set the health monster equal to 0
			if (value < 0) this.monsterhealth = 0;
		},
	},
	methods: {
		playerAttack() {
			if (this.playerHealth > 0 && this.monsterhealth > 0) {
				const attackValue = randomDamge(4, 8);
				this.monsterhealth -= attackValue;
				this.monsterAttack();
				this.displayMessage('Player', 'attack', attackValue);
			}
		},
		monsterAttack() {
			if (this.playerHealth > 0) {
				const attackValue = randomDamge(5, 10);
				this.displayMessage('Monster', 'counter', attackValue);
				this.playerHealth -= attackValue;
			}
		},
		specialAttack() {
			if (this.playerHealth > 0) {
				this.specialAttackCount += 1;
				const attackValue = randomDamge(8, 10);
				if (this.monsterhealth > 0) {
					this.monsterhealth -= attackValue;
					this.monsterAttack();
					this.displayMessage('Player', `special attack`, attackValue);
				}
			}
		},
		healPlayer() {
			if (this.playerHealth > 0 && this.playerHealth < 100) {
				this.healCount += 1;
				const healthValue = randomDamge(10, 15);
				this.displayMessage('Player', `heal`, healthValue);
				this.playerHealth += healthValue;

				if (this.playerHealth > 100) this.playerHealth = 100;
			}
		},
		surrenderPlayer() {
			if (this.monsterhealth > 0) this.playerHealth = 0;
		},
		resetGame() {
			this.gameStatus = null;
			this.playerHealth = 100;
			this.monsterhealth = 100;
			this.specialAttackCount = 0;
			this.healCount = 0;
			this.logMessages = [];
		},
		displayMessage(who, what, value) {
			this.logMessages.unshift({
				byWho: who,
				whatThing: what,
				forMany: value,
			});
		},
	},
	computed: {
		monsterStylesBar() {
			return { width: `${this.monsterhealth}%` };
		},
		playerStylesBar() {
			return { width: `${this.playerHealth}%` };
		},
		playerHalfColorHealth() {
			return this.playerHealth < 50 ? 'playerHalfColorHealth' : this.playerHealth;
		},
		changeColorBarMonster() {
			let classToBeApply = null;

			if (this.monsterhealth < 50) classToBeApply = 'halfColorMOnsterHealth';

			if (this.monsterhealth < 15) classToBeApply = 'dangerColorMonsterHealth';

			return classToBeApply;
		},
		changeColorBarPlayer() {
			let classToBeApply = null;

			if (this.playerHealth < 50) classToBeApply = 'halfColorMOnsterHealth';

			if (this.playerHealth < 15) classToBeApply = 'dangerColorMonsterHealth';

			return classToBeApply;
		},
		disableBtnAttack() {
			return this.specialAttackCount >= 2;
		},
		disableBtnHeal() {
			return this.healCount >= 3;
		},
	},
});

app.mount('#game');
