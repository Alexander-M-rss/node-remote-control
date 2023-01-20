import { down, left, mouse, right, up } from '@nut-tree/nut-js';

export const drawingCommands = ['draw_circle', 'draw_rectangle', 'draw_square'];

const rectangle = async (x: number, y: number) => {
  mouse.config.mouseSpeed = 500;
  await mouse.move(right(x));
  await mouse.move(down(y));
  await mouse.move(left(x));
  await mouse.move(up(y));
};

const circle = async ({ x, y }: { x: number; y: number }, radius: number) => {
  const step = 0.01 * Math.PI;
  const fullTurn = Math.PI * 2;
  const centerX = x + radius;

  mouse.config.mouseSpeed = 100;
  for (let angle = 0; angle <= fullTurn; angle += step) {
    await mouse.move([
      {
        x: centerX - Math.round(radius * Math.cos(angle)),
        y: y - Math.round(radius * Math.sin(angle)),
      },
    ]);
  }
};

export const draw = async (
  command: string,
  position: { x: number; y: number },
  sizeX: number,
  sizeY: number
) => {
  const mouseSpeed = mouse.config.mouseSpeed;
  let log = `${command} `;

  await mouse.pressButton(0);
  switch (command) {
    case 'draw_rectangle':
      await rectangle(sizeX, sizeY);
      log += `${sizeX} ${sizeY}`;
      break;
    case 'draw_square':
      await rectangle(sizeX, sizeX);
      log += `${sizeX}`;
      break;
    case 'draw_circle':
      await circle(position, sizeX);
      log += `${sizeX}`;
      break;
    default:
  }
  await mouse.releaseButton(0);
  mouse.config.mouseSpeed = mouseSpeed;

  return log;
};
