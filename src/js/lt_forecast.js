/* ---------------------------------------------------------------------+
|  Leftill forecasting module                                           |
+--------------------------------------------------------------------- */

// Perform linear regression
function LinearRegression (data, targetX, targetY) {
  /*
    data: array of objects each containing x,y numeric coordinates
    targetX: (optional) number used to calculate y,targetX coordinate
    targetY: (optional) number used to calculate x,targetY coordinate
  */
  const response = {}
  const isValidData = Array.isArray(data) &&
    data.length > 0 &&
    data.every(a =>
      typeof a.x === 'number' &&
      typeof a.y === 'number'
    )

  if (isValidData) {
    const dataToSum = data.map(PrepareDataToSum)
    const sum = dataToSum.reduce(SumData)
    const n = data.length
    const r = (n * sum.xy - sum.x * sum.y) / (Math.sqrt(n * sum.xSquared - sum.x ** 2) * Math.sqrt(n * sum.ySquared - sum.y ** 2))
    const slope = (n * sum.xy - sum.x * sum.y) / (n * sum.xSquared - sum.x ** 2)
    const yIntercept = (sum.y - slope * sum.x) / n
    const canCalculateY = typeof targetX === 'number' && slope !== 0
    const canCalculateX = typeof targetY === 'number' && slope !== 0

    // Add results to response object
    response.slope = slope
    response.yIntercept = yIntercept
    response.r = r || null
    response.rSquared = r ? r ** 2 : null
    response.y = canCalculateY ? slope * targetX + yIntercept : null
    response.x = canCalculateX ? (targetY - yIntercept) / slope : null
  }

  return response
}

// Prepare data series to sum it for regression
function PrepareDataToSum (a) {
  return {
    x: a.x,
    y: a.y,
    xy: a.x * a.y,
    xSquared: a.x ** 2,
    ySquared: a.y ** 2
  }
}

// Calculate sums for the data series for regression
function SumData (a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    xy: a.xy + b.xy,
    xSquared: a.xSquared + b.xSquared,
    ySquared: a.ySquared + b.ySquared
  }
}

/* ---------------------------------------------------------------------+
|  Exports                                                              |
+--------------------------------------------------------------------- */

export { LinearRegression }
