import { mouse } from '@nut-tree/nut-js';
import { draw, drawingCommands } from './drawing.js';
import { navigateMouse, navigationCommands } from './navigation.js';
import { IResult } from './type.js';
import { printScreen, printScreenCommand } from './printScreen.js';

export const commandsHandler = async (
  command: string,
  arg1: number,
  arg2: number
): Promise<IResult> => {
  const position = await mouse.getPosition();
  let result: IResult = { isResponseNeeded: false, res: '' };

  if (navigationCommands.includes(command)) {
    result = await navigateMouse(command, position, arg1);
  }
  if (drawingCommands.includes(command)) {
    result.res = await draw(command, position, arg1, arg2);
  }
  if (result.res) {
    console.log(result.res);
  }
  if (printScreenCommand === command) {
    const { x, y } = position;

    console.log(`${command} ${x} ${y}`);
    result = { isResponseNeeded: true, res: await printScreen(x, y) };
  }

  return result;
};
