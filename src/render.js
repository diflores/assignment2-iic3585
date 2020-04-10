import { Path, Point, setup, project, view } from 'paper';

const COLORS = {
  players: ['#1e90ff', '#9f0000'],
}

const EVENTS = {
  COLLISION: (event) => new CustomEvent('collision', { detail: event }),
}

const player = (player, index) => {
  const { x, y } = player;

  const p = new Point(x, y);
  const path = new Path.Circle(p, 20);
  path.fillColor = COLORS.PLAYERS[index];

  return path;
};

const update = (state) => {
  project.clear();
  const _players = state.players.map(player);

  if (_players[0].intersects(_players[1])) document.dispatchEvent(EVENTS.COLLISION({ player: 0 }));

  view.draw();
}

const gameSetup = () => {
  const canvas = document.getElementById('canvas');
  setup(canvas);
}

const renderGame = (state) => {
  update(state);
}

export { renderGame, gameSetup }
