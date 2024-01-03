export class RegionComparison {


    constructor(item){
        this.delta_closing = Math.round(this.delta(32.5, item.closing_rate))
        this.delta_cpl = Math.round(this.delta(22, item.cpl))
        this.delta_ctl = Math.round(this.delta(28, item.ctl))
        this.delta_score = Math.round(this.delta(50, item.score))
    }

    delta(target, actual){
        return ((actual - target) / target) * 100
    }

}