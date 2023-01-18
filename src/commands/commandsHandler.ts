import { mouse } from '@nut-tree/nut-js';
import { navigateMouse, navigationCommands } from './navigation.js';

export const commandsHandler = async (command: string, arg1: number, arg2: number) => {
  const position = await mouse.getPosition();

  if (navigationCommands.includes(command)) {
    const { isResponseNeeded, res } = await navigateMouse(command, position, arg1);

    console.log(res);
    return isResponseNeeded && res;
  }
};
