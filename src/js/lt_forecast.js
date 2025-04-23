/* ---------------------------------------------------------------------+
|  Leftill forecasting module                                           |
+--------------------------------------------------------------------- */

function CalculateLinearModel (data) {
  /*
    data: array of objects each containing x,y numeric coordinates
  */
  const model = {}
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
    model.slope = (n * sum.xy - sum.x * sum.y) / (n * sum.xSquared - sum.x ** 2)
    model.yIntercept = (sum.y - model.slope * sum.x) / n
    model.r = (n * sum.xy - sum.x * sum.y) / (Math.sqrt(n * sum.xSquared - sum.x ** 2) * Math.sqrt(n * sum.ySquared - sum.y ** 2)) || NaN
  }
  return model

  function PrepareDataToSum (a) {
    return {
      x: a.x,
      y: a.y,
      xy: a.x * a.y,
      xSquared: a.x ** 2,
      ySquared: a.y ** 2
    }
  }

  function SumData (a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      xy: a.xy + b.xy,
      xSquared: a.xSquared + b.xSquared,
      ySquared: a.ySquared + b.ySquared
    }
  }
}

function CalculateX (slope, yIntercept, y) {
  /*
         slope: number from a linear regression model, must be non-zero to calculate x
    yIntercept: number from a linear regression model
             y: numeric coordinate to calculate x numeric coordinate
  */
  const canCalculateX = typeof slope === 'number' &&
    typeof yIntercept === 'number' &&
    typeof y === 'number' &&
    slope !== 0

  return canCalculateX ? (y - yIntercept) / slope : NaN
}

function CalculateY (slope, yIntercept, x) {
  /*
         slope: number from a linear regression model, must be non-zero to calculate y
    yIntercept: number from a linear regression model
             x: numeric coordinate to calculate y numeric coordinate
  */
  const canCalculateY = typeof slope === 'number' &&
    typeof yIntercept === 'number' &&
    typeof x === 'number' &&
    slope !== 0

  return canCalculateY ? slope * x + yIntercept : NaN
}

/* ---------------------------------------------------------------------+
|  Exports                                                              |
+--------------------------------------------------------------------- */

export { CalculateLinearModel, CalculateX, CalculateY }
