import { expect, describe, it } from 'vitest'
import * as forecast from '../src/js/lt_forecast'

describe('Linear Regression', () => {
  const data = [
    { x: 1, y: 100 },
    { x: 2, y: 90 },
    { x: 4, y: 70 }
  ]

  const dataNoSlope = [
    { x: 1, y: 100 },
    { x: 2, y: 100 },
    { x: 4, y: 100 }
  ]

  const badData = [
    { x: 'a', y: 100 },
    { x: 2, y: null },
    { x: [], y: 70 }
  ]

  const invalidKeys = [
    { a: 1, b: 100 },
    { x: 2, y: 90 },
    { a: 4, b: 70 }
  ]

  it('is a forecast of y with a targetX value provided', () => {
    expect(forecast.LinearRegression(data, 3)).toEqual({ r: -1, rSquared: 1, slope: -10, x: null, y: 80, yIntercept: 110 })
  })

  it('is a forecast of x with a targetY value provided', () => {
    expect(forecast.LinearRegression(data, false, 80)).toEqual({ r: -1, rSquared: 1, slope: -10, x: 3, y: null, yIntercept: 110 })
  })

  it('is a forecast that can\'t be calculated due to targetX AND targetY passed', () => {
    expect(forecast.LinearRegression(data, 3, 80)).toEqual({ r: -1, rSquared: 1, slope: -10, x: null, y: null, yIntercept: 110 })
  })

  it('is a forecast that can\'t be calculated due to targetX AND a falsey targetY passed', () => {
    expect(forecast.LinearRegression(data, 3, 0)).toEqual({ r: -1, rSquared: 1, slope: -10, x: null, y: null, yIntercept: 110 })
  })

  it('is a forecast with only data passed to it', () => {
    expect(forecast.LinearRegression(data)).toEqual({ r: -1, rSquared: 1, slope: -10, x: null, y: null, yIntercept: 110 })
  })

  it('is a forecast with only data passed to it and a slope of 0', () => {
    expect(forecast.LinearRegression(dataNoSlope)).toEqual({ r: null, rSquared: null, slope: 0, x: null, y: null, yIntercept: 100 })
  })

  it('is a forecast that can\'t be calculated due to a slope of 0', () => {
    expect(forecast.LinearRegression(dataNoSlope, 3)).toEqual({ r: null, rSquared: null, slope: 0, x: null, y: null, yIntercept: 100 })
  })

  it('is an invalid set of values provided', () => {
    expect(forecast.LinearRegression(badData, 3, 80)).toEqual({})
  })

  it('is an invalid set of object keys provided', () => {
    expect(forecast.LinearRegression(invalidKeys, 3, 80)).toEqual({})
  })

  it('is an invalid array provided, but not of objects', () => {
    expect(forecast.LinearRegression([1, 'string', 3])).toEqual({})
  })

  it('is an invalid object provided, not an array of objects', () => {
    expect(forecast.LinearRegression({ a: 1, b: 2 })).toEqual({})
  })

  it('is an invalid string provided, not an array of objects', () => {
    expect(forecast.LinearRegression('text')).toEqual({})
  })

  it('is a functional call with no parameters', () => {
    expect(forecast.LinearRegression()).toEqual({})
  })

  it('is an empty array provided, not an array of objects', () => {
    expect(forecast.LinearRegression([])).toEqual({})
  })

  it('is an invalid empty object provided, not an array of objects', () => {
    expect(forecast.LinearRegression({})).toEqual({})
  })

  it('is an empty object provided, not an array of objects', () => {
    expect(forecast.LinearRegression({})).toEqual({})
  })

  it('is an empty array with an empty object provided, not an array of objects', () => {
    expect(forecast.LinearRegression([{}])).toEqual({})
  })
})
