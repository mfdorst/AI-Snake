export function oppositeDirection(direction) {
  switch (direction) {
    case 'north':
      return 'south'
    case 'east':
      return 'west'
    case 'south':
      return 'north'
    case 'west':
      return 'east'
  }
}

export const backgroundColor = '#111'
