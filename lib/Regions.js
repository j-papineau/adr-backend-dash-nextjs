export class Region {
    //CtL, Prof, CpL, Closing, Name
    // --row--
    //     0: "Region"
    //     1: "Ad Cost"
    //     2: "Sum of Impressions"
    //     3: "# of Clicks"
    //     4: "Click Thru Rate"
    //     5: "Cost per Click"
    //     6: "Click to lead %"
    //     7: "Cost per Lead"
    //     8: "Cost per sale"
    //     9: "Total Sales"
    //     10: "New Sales"
    //     11: "New Sales %"
    //     12: "Swaps"
    //     13: "% Swaps"
    //     14: "%GT Total Sales"
    //     15: "All leads"
    //     16: "Quoted Leads"
    //     17: "Not Quoted Leads"
    //     18: "% Not Quoted Leads"
    //     19: "Closing Rate"
    //     20: "Expected Average Profit"
    constructor(row){
        this.name = row[0] //str
        this.cost = this.dollar_to_int(row[1])  //$
        this.clicks = parseInt(row[3]) //int
        this.click_through = this.percent_to_int(row[4]) //%
        this.cost_per_click = this.dollar_to_int(row[5]) //$
        this.click_to_lead = this.percent_to_int(row[6]) //%
        this.cost_per_lead = this.dollar_to_int(row[7]) //$
        this.cost_per_sale = this.dollar_to_int(row[8]) //$
        this.total_sales = parseInt(row[9]) //int
        this.total_leads = parseInt(row[15]) //int
        this.closing_rate = this.percent_to_int(row[19]) //%
        this.avg_profit = parseFloat(row[20]) //int (dollar)
        this.score = this.calc_score()
    }
    
    increment(row){
        this.name = "Sum Object"
        this.cost += this.dollar_to_int(row[1])  //$
        this.clicks += parseInt(row[3]) //int
        this.click_through += this.percent_to_int(row[4]) //%
        this.cost_per_click += this.dollar_to_int(row[5]) //$
        this.click_to_lead += this.percent_to_int(row[6]) //%
        this.cost_per_lead += this.dollar_to_int(row[7]) //$
        this.cost_per_sale += this.dollar_to_int(row[8]) //$
        this.total_sales += parseInt(row[9]) //int
        this.total_leads += parseInt(row[15]) //int
        this.closing_rate += this.percent_to_int(row[19]) //%
        this.avg_profit += parseFloat(row[20]) //int (dollar)
        // this.score += this.calc_score()
    }

    parseAv(num){
        this.cost /= num
        this.clicks /= num
        this.click_through /= num
        this.cost_per_click /= num
        this.click_to_lead /= num
        this.cost_per_lead /= num
        this.cost_per_sale /= num
        this.cost_per_sale /= num
        this.total_sales /= num
        this.total_leads /= num
        this.closing_rate /= num
        this.avg_profit /= num
        this.score = this.calc_score()
    }

    dollar_to_int(num){
        num = num.replace(/[$,]+/g,"");
        var result = parseFloat(num) + .05;
        return result    
    }

    percent_to_int(num){
        num = num.replace(/[%]+/g, "")
        var result = parseFloat(num)
        return result
    }

    inspect(depth, opts){
        return {"region": this.name, "cost": this.cost, "CtR": this.click_through, "CpC": this.cpc, "CpL": this.cost_per_lead, "score": this.score}
    }

    calc_score(){
        var goals = {"ctl": 28, "prof": 200, "cpl": 22, "closing": 32.5}
        var weights = {"ctl": .30, "prof": .10, "cpl": .35, "closing": .25}
        
        let d_ctl = this.inv_normalize(goals["ctl"], this.click_to_lead)
        let d_prof = this.inv_normalize(goals["prof"], this.avg_profit)
        let d_cpl = this.normalize(goals["cpl"], this.cost_per_lead)
        let d_close = this.inv_normalize(goals["closing"], this.closing_rate)

        let score = (d_ctl * weights["ctl"]) + (d_prof * weights["prof"]) + (d_cpl * weights["cpl"]) + (d_close * weights["closing"])

        return score

    }

    normalize(target, actual){
        let par = (target - actual) / target
        par = par * 50
        let score = par + 50
        if (score > 100)
            score = 100
        if (score < 0)
            score = 0
        return score
    }

    inv_normalize(target, actual){
        let par = (target - actual) / target
        par = par * 50
        let score = 50 - par
        if (score > 100)
            score = 100
        if (score < 0)
            score = 0
        return score
    }
  
}


