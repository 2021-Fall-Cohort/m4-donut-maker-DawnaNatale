class donutMaker {
    constructor() {
        this.donutCount = 0;
        this.rate = 1;
        this.autoClickersPurchased = 0;
        this.autoClickerCost = 100;
        this.multipliersPurchased = 0;
        this.multiplierCost = 100;
        this.autoClickerId = undefined;
    }

    //this runs every time we click
    bake() {
        this.donutCount += this.rate;
    }

    recalculateRate() {
        this.rate = Math.pow(1.2, this.multipliersPurchased);
    }

    getCount() {
        return this.donutCount;
    }

    getACCount() {
        return this.autoClickersPurchased;
    }

    getMultiplierCount() {
        return this.multipliersPurchased;
    }

    getAutoCost() {
        return this.autoClickerCost;
    }

    getMultiplierCost() {
        return this.multiplierCost;
    }

}

