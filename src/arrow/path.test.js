import { pathAbsolute, pathListSVG } from './path'

test('check pathAbsolute', () => {
  const point = {
    x: 100,
    y: 100,
  }

  const offset = {
    x: 40,
    y: 40,
  }
  
  const expected = {
    x: 60,
    y: 60,
  }

  expect(pathAbsolute(point, offset)).toStrictEqual(expected)
})

test('check pathAbsolute with extra props', () => {
  const point = {
    x: 150,
    y: 1600,
    translation: [1, -1],
  }

  const offset = {
    x: -40,
    y: 120,
  }
  
  const expected = {
    x: 190,
    y: 1480,
    translation: [1, -1],
  }

  expect(pathAbsolute(point, offset)).toStrictEqual(expected)
})

test('check pathListSVG', () => {
  let points = [
    { x: 10, y: 50 },
    { x: 30, y: 40 },
    { x: 40, y: 60 },
    { x: 100, y: 500 },
  ]

  expect(pathListSVG(points)).toBe('M 10 50 C 30 40, 40 60, 100 500')

  points = [
    { x: 80, y: 10 },
    { x: 90, y: 30 },
    { x: 90, y: 60 },
    { x: 150, y: 300 },
  ]

  expect(pathListSVG(points)).toBe('M 80 10 C 90 30, 90 60, 150 300')
})