/* ---------------------------------------------------------------------+
|  Leftill forecasting module                                           |
+--------------------------------------------------------------------- */

/* ---------------------------------------------------------------------+
|  Type definitions                                                     |
+--------------------------------------------------------------------- */

/**
 * @typedef {Object} RegressionInputData
 * @property {number} x - The x coordinate in a pair
 * @property {number} y - The y coordinate in a pair
 */

/**
 * @typedef {Object} LinearRegressionModel
 * @property {number} slope - The rate of change of y per unit of x
 * @property {number} yIntercept - The value of y at x = 0
 * @property {number|NaN} r - The correlation coefficient
 */

/* ---------------------------------------------------------------------+
|  Linear regression functions                                          |
+--------------------------------------------------------------------- */

/**
 * Performs linear regression calculation
 * @param {RegressionInputData[]} data - array of objects each containing x,y numeric coordinates
 * @returns {LinearRegressionModel|{}}
 */
function CalculateLinearModel (data) {
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

  /**
   * @param {RegressionInputData} a
   * @returns {{ x: number; y: number; xy: number; xSquared: number; ySquared: number; }}
   */
  function PrepareDataToSum (a) {
    return {
      x: a.x,
      y: a.y,
      xy: a.x * a.y,
      xSquared: a.x ** 2,
      ySquared: a.y ** 2
    }
  }

  /**
   * @param {{ x: number; y: number; xy: number; xSquared: number; ySquared: number; }} a
   * @param {{ x: number; y: number; xy: number; xSquared: number; ySquared: number; }} b
   * @returns {{ x: number; y: number; xy: number; xSquared: number; ySquared: number; }}
   */
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

/**
 * @param {number} slope - number from a linear regression model, must be non-zero to calculate x
 * @param {number} yIntercept - number from a linear regression model
 * @param {number} y - numeric coordinate to calculate x numeric coordinate
 * @returns {number|NaN} - x at y coordinate
 */
function CalculateX (slope, yIntercept, y) {
  const canCalculateX = typeof slope === 'number' &&
    typeof yIntercept === 'number' &&
    typeof y === 'number' &&
    slope !== 0

  return canCalculateX ? (y - yIntercept) / slope : NaN
}

/**
 * @param {number} slope - number from a linear regression model, must be non-zero to calculate y
 * @param {number} yIntercept - number from a linear regression model
 * @param {number} x - numeric coordinate to calculate y numeric coordinate
 * @returns {number|NaN} - y at x coordinate
 */
function CalculateY (slope, yIntercept, x) {
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
