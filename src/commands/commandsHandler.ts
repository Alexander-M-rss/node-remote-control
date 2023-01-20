import { mouse } from '@nut-tree/nut-js';
import { draw, drawingCommands } from './drawing.js';
import { navigateMouse, navigationCommands } from './navigation.js';
import { IResult } from './type.js';

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

  return result;
};
