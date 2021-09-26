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
		};
	},
	methods: {
		playerAttack() {
			if (this.playerHealth > 0) {
				if (this.monsterhealth > 0) {
					const attackValue = randomDamge(4, 8);
					this.monsterhealth -= attackValue;
					this.monsterAttack();
				}
			}

			if (this.playerHealth <= 0) {
				this.playerHealth = 0;
			}
		},
		monsterAttack() {
			if (this.playerHealth > 0) {
				const attackValue = randomDamge(5, 10);
				this.playerHealth -= attackValue;
			}

			if (this.monsterhealth < 0) {
				this.monsterhealth = 0;
			}
		},
		specialAttack() {
			this.specialAttackCount += 1;
			if (this.playerHealth > 0) {
				const attackValue = randomDamge(8, 16);
				if (this.monsterhealth > 0) {
					this.monsterhealth -= attackValue;
					this.monsterAttack();
				}
			}
		},
		healPlayer() {
			if (this.playerHealth >= 0 && this.playerHealth < 100) {
				this.healCount += 1;
				const healthValue = randomDamge(10, 15);
				console.log(healthValue);
				this.playerHealth += healthValue;
				if (this.playerHealth > 100) {
					this.playerHealth = 100;
				}
			}
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

			if (this.monsterhealth < 50) {
				classToBeApply = 'halfColorMOnsterHealth';
			}

			if (this.monsterhealth < 15) {
				classToBeApply = 'dangerColorMonsterHealth';
			}

			return classToBeApply;
		},
		changeColorBarPlayer() {
			let classToBeApply = null;

			if (this.playerHealth < 50) {
				classToBeApply = 'halfColorMOnsterHealth';
			}

			if (this.playerHealth < 15) {
				classToBeApply = 'dangerColorMonsterHealth';
			}

			return classToBeApply;
		},
		disableBtnAttack() {
			return this.specialAttackCount >= 2;
		},
		disableBtnHeal() {
			console.log(this.healCount);
			return this.healCount >= 3;
		},
	},
});

app.mount('#game');
