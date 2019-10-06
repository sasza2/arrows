import { pathAbsolute } from './path'

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