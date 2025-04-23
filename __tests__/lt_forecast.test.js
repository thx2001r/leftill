import { expect, describe, it } from 'vitest'
import * as forecast from '../src/js/lt_forecast'

describe('Calculate Linear Regression Model', () => {
  it('is a function call with no parameters', () => {
    expect(forecast.CalculateLinearModel()).toEqual({})
  })

  const data = [
    { x: 1, y: 100 },
    { x: 2, y: 90 },
    { x: 4, y: 70 }
  ]

  it('is a model with a slope', () => {
    expect(forecast.CalculateLinearModel(data)).toEqual({ slope: -10, yIntercept: 110, r: -1 })
  })

  const dataNoSlope = [
    { x: 1, y: 100 },
    { x: 2, y: 100 },
    { x: 4, y: 100 }
  ]

  it('is a model with no slope', () => {
    expect(forecast.CalculateLinearModel(dataNoSlope)).toEqual({ slope: 0, yIntercept: 100, r: NaN })
  })

  const badData = [
    { x: 'a', y: 100 },
    { x: 2, y: null },
    { x: [], y: 70 }
  ]

  it('is an invalid set of values provided', () => {
    expect(forecast.CalculateLinearModel(badData)).toEqual({})
  })

  const invalidKeys = [
    { a: 1, b: 100 },
    { x: 2, y: 90 },
    { a: 4, b: 70 }
  ]

  it('is an invalid set of object keys provided', () => {
    expect(forecast.CalculateLinearModel(invalidKeys)).toEqual({})
  })

  it('is an invalid array provided, but not of objects', () => {
    expect(forecast.CalculateLinearModel([1, 'string', 3])).toEqual({})
  })

  it('is an invalid object provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel({ a: 1, b: 2 })).toEqual({})
  })

  it('is an invalid string provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel('text')).toEqual({})
  })

  it('is an empty array provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel([])).toEqual({})
  })

  it('is an invalid empty object provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel({})).toEqual({})
  })

  it('is an empty object provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel({})).toEqual({})
  })

  it('is an empty array with an empty object provided, not an array of objects', () => {
    expect(forecast.CalculateLinearModel([{}])).toEqual({})
  })
})

describe('Forecast X With A Linear Regression Model', () => {
  it('is a function call with no parameters', () => {
    expect(forecast.CalculateX()).toEqual(NaN)
  })

  it('is a forecast of X with a slope', () => {
    expect(forecast.CalculateX(-10, 110, 80)).toEqual(3)
  })

  it('is a forecast of X with no slope', () => {
    expect(forecast.CalculateX(0, 110, 80)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid slope', () => {
    expect(forecast.CalculateX(NaN, 110, 80)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid slope data type', () => {
    expect(forecast.CalculateX('a', 110, 80)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid yIntercept', () => {
    expect(forecast.CalculateX(-10, NaN, 80)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid yIntercept data type', () => {
    expect(forecast.CalculateX(-10, '110', 80)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid y coordinate', () => {
    expect(forecast.CalculateX(-10, 110, NaN)).toEqual(NaN)
  })

  it('is a forecast of X with an invalid y coordinate data type', () => {
    expect(forecast.CalculateX(-10, 110, '80')).toEqual(NaN)
  })

  it('is a forecast of X missing an y coordinate', () => {
    expect(forecast.CalculateX(-10, 110)).toEqual(NaN)
  })

  it('is a forecast of X missing a yIntercept and an y coordinate', () => {
    expect(forecast.CalculateX(-10)).toEqual(NaN)
  })
})

describe('Forecast Y With A Linear Regression Model', () => {
  it('is a function call with no parameters', () => {
    expect(forecast.CalculateY()).toEqual(NaN)
  })

  it('is a forecast of Y with a slope', () => {
    expect(forecast.CalculateY(-10, 110, 3)).toEqual(80)
  })

  it('is a forecast of Y with no slope', () => {
    expect(forecast.CalculateY(0, 110, 3)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid slope', () => {
    expect(forecast.CalculateY(NaN, 110, 3)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid slope data type', () => {
    expect(forecast.CalculateY('a', 110, 3)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid yIntercept', () => {
    expect(forecast.CalculateY(-10, NaN, 3)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid yIntercept data type', () => {
    expect(forecast.CalculateY(-10, '110', 3)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid x coordinate', () => {
    expect(forecast.CalculateY(-10, 110, NaN)).toEqual(NaN)
  })

  it('is a forecast of Y with an invalid x coordinate data type', () => {
    expect(forecast.CalculateY(-10, 110, '3')).toEqual(NaN)
  })

  it('is a forecast of Y missing an x coordinate', () => {
    expect(forecast.CalculateY(-10, 110)).toEqual(NaN)
  })

  it('is a forecast of Y missing a yIntercept and an x coordinate', () => {
    expect(forecast.CalculateY(-10)).toEqual(NaN)
  })
})
