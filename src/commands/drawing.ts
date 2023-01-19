import { down, left, mouse, right, up } from '@nut-tree/nut-js';

export const drawingCommands = ['draw_circle', 'draw_rectangle', 'draw_square'];

const rectangle = async (x: number, y: number) => {
  await mouse.move(right(x));
  await mouse.move(down(y));
  await mouse.move(left(x));
  await mouse.move(up(y));
};

export const draw = async (
  command: string,
  position: { x: number; y: number },
  sizeX: number,
  sizeY: number
) => {
  await mouse.pressButton(0);
  switch (command) {
    case 'draw_rectangle':
      await rectangle(sizeX, sizeY);
      break;
    default:
  }
  await mouse.releaseButton(0);
};
