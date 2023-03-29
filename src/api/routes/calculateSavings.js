module.exports = {
  route: '/api/calculate',
  async on(req, res) {
    // Calculate what they want to earn and return a tip and whatnot
    const currentlyEarning = req.query.current_earning
    const currentlySaving = req.query.current_saving

    const goalEarning = req.query.goal_earning
    const goalSaving = req.query.goal_saving

    const earnDif = Math.max(goalEarning - currentlyEarning, 0)
    
    const savingPercentage = (currentlySaving / currentlyEarning) * 100.0

    let status = "EARNING"
    let tips = []

    if (earnDif > 10000) {
      status = "CHANGE_JOB"
      tips.push("Try getting a new job, this one might not allow you to make as much as you're hoping.")
    } else if (earnDif == 0) {
      status = "EARNING"
      tips.push("You're already earning that much! Great job.")
    } else if (earnDif <= 10000) {
      status = "PAY_RISE"
      tips.push("You're pretty close, maybe aiming for a pay rise is a good idea.")
    }

    if (savingPercentage < 19) {
      tips.push("Try putting more into your savings, you should be saving at least 20%.")
    } else if (savingPercentage > 25 && earnDif > 1000) {
      tips.push("You might want to put less into your savings, no more than around 20%.")
    } else {
      tips.push("You're saving a solid 20%, keep that up.")
    }

    res.send({
      status: status,
      tips: JSON.stringify(tips),
      moneyToEarn: earnDif,
      moneyToSave: Math.max(goalSaving - currentlySaving, 0)
    })
  }
}