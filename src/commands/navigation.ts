import { mouse } from '@nut-tree/nut-js';

export const navigationCommands = [
  'mouse_up',
  'mouse_down',
  'mouse_left',
  'mouse_right',
  'mouse_position',
];

export const navigateMouse = async (
  command: string,
  position: { x: number; y: number },
  delta: number
) => {
  let { x, y } = position;
  let res = '';
  let isResponseNeeded = false;

  switch (command) {
    case 'mouse_position':
      res = `${command} ${x},${y}`;
      isResponseNeeded = true;
      break;
    case 'mouse_up':
      y -= delta;
      break;
    case 'mouse_down':
      y += delta;
      break;
    case 'mouse_left':
      x -= delta;
      break;
    case 'mouse_right':
      x += delta;
      break;
    default:
  }
  if (command !== 'mouse_position') {
    res = `${command} ${delta}`;
    await mouse.setPosition({ x, y });
  }

  return { isResponseNeeded, res };
};
