const paper = require("paper");

const COLORS = {
  players: ["#1e90ff", "#9f0000"],
};

const EVENTS = {
  COLLISION: event => new CustomEvent("collision", { detail: event }),
};

const player = (player, index) => {
  const { x, y } = player[player.length - 1];
  const p = new paper.Point(x, y);
  const path = new paper.Path.Circle(p, 4);
  path.strokeColor = COLORS.players[index];
  path.strokeWidth = 10;
  return path;
};

const tail = (player, index) => {
  const path = new paper.Path();
  path.strokeColor = COLORS.players[index];
  path.strokeWidth = 10;
  player.slice(1).forEach((point, index) => {
    path.add(new paper.Point(point.x, point.y));
  });
  path.smooth()
  return path;
};

const update = state => {
  paper.project.clear();
  const _players = state.players.map(player);
  const _tails = state.players.map(tail);

  document.dispatchEvent(EVENTS.COLLISION({ player: 0 }));
  if (_players[0].intersects(_tails[1])) {
    alert(`GAME OVER! The winner es player 2. Refresh the page to play again.`);
  }
  if (_players[1].intersects(_tails[0])) {
    alert(`GAME OVER! The winner es player 1. Refresh the page to play again.`);
  }

  paper.view.draw();
};

const gameSetup = () => {
  const canvas = document.getElementById("canvas");
  paper.setup(canvas);
};

const renderGame = state => {
  update(state);
};

export { renderGame, gameSetup };
