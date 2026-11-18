// Screenshot staging for Neo City Drive - Rewritten
import { STEP } from './config.js';
import { EVENT_OVER } from './world.js';
import { SCREEN_OVER, SCREEN_PLAY, SCREEN_TITLE } from './render.js';

export function stageShot(name, world) {
  world.reset();
  if (name !== 'play' && name !== 'end') {
    for (let i = 0; i < 30; i++) world.step(STEP, 0, true);
    return { screen: SCREEN_TITLE, best: 1000 };
  }

  const limit = name === 'end' ? 600 : 120;
  for (let i = 0; i < limit; i++) {
    if (world.step(STEP, (i % 30 < 15 ? 0.5 : -0.5), true) & EVENT_OVER) break;
  }
  const over = world.state.lives === 0;
  return { screen: over ? SCREEN_OVER : SCREEN_PLAY, best: world.state.score };
}
