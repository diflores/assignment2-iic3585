const paper = require('paper');

const COLORS = {
  players: ['#1e90ff', '#9f0000'],
}

const EVENTS = {
  COLLISION: (event) => new CustomEvent('collision', { detail: event }),
}

const player = (player, index) => {
  const { x, y } = player;

  const p = new paper.Point(x, y);
  const path = new paper.Path.Circle(p, 8);
  path.fillColor = COLORS.players[index];

  return path;
};

const update = (state) => {
  paper.project.clear();
  const _players = state.players.map(player);

  if (_players[0].intersects(_players[1])) document.dispatchEvent(EVENTS.COLLISION({ player: 0 }));

  paper.view.draw();
}

const gameSetup = () => {
  const canvas = document.getElementById('canvas');
  paper.setup(canvas);
}

const renderGame = (state) => {
  update(state);
}

export { renderGame, gameSetup }
