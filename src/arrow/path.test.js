import { DIRECTION } from '../consts'
import ends from './ends'
import path, { pathAbsolute, pathListSVG } from './path'

import Element from '../jsx/element'

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

test('path', () => {
  const from = {
    direction: DIRECTION.TOP,
    node: Element.fake({
      x: 100,
      y: 50,
      width: 5,
      height: 5,
    }),
    translation: [-0.5, -1],
  }
  const to = {
    direction: DIRECTION.TOP,
    node: Element.fake({
      x: 750,
      y: 450,
      width: 5,
      height: 5,
    }),
    translation: [-0.4, 1]
  }

  const expected = {
    offset: { x: -222.5, y: -350 },
    size: { x: 975, y: 1200 },
    points: 'M 325 400 C 0 0, 715 1200, 975 800'
  }

  expect(path(ends(from), ends(to))).toStrictEqual(expected)
})