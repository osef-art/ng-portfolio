function loadImg(url) {
  var img= new Image();
  img.src= url;
}

window.onload = function() {
  // Instaurer une fonction reccursive qui liste les images et appel loadImg sur chaque img

};

const canvas = document.getElementById('game_area');
      fx_high = canvas.getContext('2d'),
      fx_low = canvas.getContext('2d'),
      figure = canvas.getContext('2d'),
      pixel = canvas.getContext('2d'),
      html = document.documentElement,
      body = document.body,
      len = Math.max( body.scrollHeight, body.offsetHeight,
                      html.clientHeight, html.scrollHeight,
                      html.offsetHeight) * 0.95;
      
var kills = 0,
    nb_px = 20,
    chrono = 0,
    mute = true,
    key_timer = 0,
    px = len/nb_px,

    stick =     {x: len/2, y: 0,   x_acc: 0, y_acc: 9, timer: 0, state: 'fall',  look: '_r', health: 100, gravity: 0.9, friction: 0.8, invincible : false},
    enemies = [ {x: len,   y: len, x_acc: 0, y_acc: 0, timer: 0, state: 'stand', look: '_r', health: 100, gravity: 0.7, friction: 0.7, type: 'enemy1', speed: 5, dexterity: 6, range: 85 },
                {x: -100,  y: len, x_acc: 0, y_acc: 0, timer: 0, state: 'stand', look: '_r', health: 100, gravity: 0.5, friction: 0.6, type: 'enemy2', speed: 7, dexterity: 4, range: 100},
                {x: -100,  y: len, x_acc: 0, y_acc: 0, timer: 0, state: 'stand', look: '_r', health: 100, gravity: 0.5, friction: 0.6, type: 'enemy2', speed: 7, dexterity: 4, range: 100},
                {x: -100,  y: len, x_acc: 0, y_acc: 0, timer: 0, state: 'stand', look: '_r', health: 100, gravity: 0.5, friction: 0.6, type: 'enemy2', speed: 7, dexterity: 4, range: 100} ],
    offset =    {x: 0,     y: 0,   x_acc: 0, y_acc: 0, x_focus: len/2, y_focus: len*3/4},
    effect =    {x: 0,     y: 0,   timer: 0, size:  0, type: false},
    pltfms =  [ {x: 900,   y: len-450, dx: 400, dy: 10},
                {x: 1200,  y: len-500, dx: 200, dy: 10},
                {x: 1000,  y: len-300, dx: 400, dy: 10},
                {x: 300,   y: len-200, dx: 400, dy: 10},
                {x: 400,   y: len-300, dx: 200, dy: 10},
                {x: 800,   y: len-150, dx: 400, dy: 10} ],
    pressed =   {timer: 0, prev: {}, prev_touch: false};

var randint = function(min, max) {

  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var play_sound = function(file) {
  if (mute) {
    return 0;
  }
  let sound = new Audio(),
      num = '';

  if (file == 'game_over') {
    play_sound('explosion');
  } else if (file == 'death') {
    num = randint(0, 5);
  } else if (file == 'hit') {
    num = randint(0, 3);
  } else if (file == 'impact' || file == 'dash') {
    num = randint(0, 2);
  } else if (file == 'whoosh' || file == 'whoosh_low') {
    num = randint(0, 1);
  }
  file += num.toString();
  sound.src = 'sounds/' + file + '.wav';
  sound.volume = 0.5;
  sound.play();
};

var size = function(obj) {
  var size = 0;
  for (var key in obj) {
    if (obj[key] == true) {
      size++;
  };
  }
  return size;
};

var load_loop = function(num, name) {
  var img = new Image();

  for (let i = 0; i < num; i++) {
    img.src= 'img/'+ name + '_r' + i + '.png';
    figure.drawImage(img, 0, 0, 0, 0);

    img.src= 'img/'+ name + '_l' + i + '.png';
    figure.drawImage(img, 0, 0, 0, 0);
  }
};

var generate_enemy = function(enemy, type) {
  enemy.x = [stick.x - len*2/3, stick.x + len*2/3][randint(0,1)];
  enemy.y = len;
  enemy.x_acc = 0;
  enemy.y_acc = 0;
  enemy.timer = 0;
  enemy.type = type;
  enemy.health = 100;
  enemy.state = 'stand';

  if (type == 'enemy1') {
    enemy.gravity = 0.7;
    enemy.friction = 0.8;
    enemy.speed = 5;
    enemy.dexterity = 6;
    enemy.range = 85;
  }
  if (type == 'enemy2') {
    enemy.gravity = 0.5;
    enemy.friction = 0.8;
    enemy.speed = 7;
    enemy.dexterity = 4;
    enemy.range = 100;
  }
  if (type == 'enemy3') {
    enemy.gravity = 0.7;
    enemy.friction = 0.75;
    enemy.speed = 3;
    enemy.dexterity = 10;
    enemy.range = 60;
  }
  if (type == 'enemy4') {
    enemy.gravity = 0.7;
    enemy.friction = 0.9;
    enemy.speed = 6;
    enemy.dexterity = 6;
    enemy.range = 100;
  }
};

// affichage
function draw_background() {
  for (let x = 0; x < nb_px; x++) {
    for (let y = 0; y < nb_px; y++) {
      pixel.fillStyle = (x % 2 == y % 2) ? '#404040' : '#353535';
      pixel.globalAlpha = y/nb_px + 0.25;
      pixel.fillRect(x*px, y*px, px, px);
    }
  }

  if (offset.y > -50) {
    pixel.fillStyle = '#757575';
    pixel.fillRect(0, len - 20 - offset.y, len, 50);
  }
};

function draw_stick() {
  // ( 'timer' / (vitesse) ) %(nb de frames)
  var index,
      stickman = new Image();

  if (stick.state == 'punch' || stick.state == 'kick' ||
      stick.state == 'brush' || stick.state == 'uppercut') {
    index= Math.floor(stick.timer)%8
    if (stick.timer > 8) {
      stick.timer = 0
      stick.state = 'stand'
    }
  }
  if (stick.state == 'uppaircut' || stick.state == 'airkick') {
    index= Math.floor(stick.timer)%8
    if (stick.timer > 8) {
      stick.timer = 0
      stick.state = 'fall'
    }
  }

  if (stick.state == 'squatting') {
    index= Math.floor(stick.timer/3)%4
    if (stick.timer >= 4) {
      stick.timer = 0
      stick.state = 'stand'
    }
  }
  if (stick.state == 'jump') {
    index= Math.floor(stick.timer/7)%4
  }

  if (stick.state == 'fall') {
    index= Math.floor(stick.timer/4)%3
  }
  if (stick.state == 'looping') {
    index= Math.floor(stick.timer/4)%4;
  }

  if (stick.state == 'dash') {
    index= Math.floor(stick.timer)%2
    if (stick.timer > 2) {
      stick.timer = 0
      stick.state = 'stand'
    }
  }
  if (stick.state == 'stand' || stick.state == 'squat') {
    index= Math.floor(chrono/16)%2
  }
  if (stick.state == 'walk') {
    index= Math.floor(chrono/8)%2
  }
  if (stick.state == 'hurt' || stick.state == 'charge') {
    index= Math.floor(chrono/2)%2
  }
  if (stick.state == 'dead') {
    index= 0
  }

  // ombre
  figure.globalAlpha = 0.25;
  figure.fillStyle = '#252525';
  figure.fillRect(stick.x-30 + (len-stick.y)/20 - offset.x, len-13, 60 - (len-stick.y)/10, 7 - (len-stick.y)/100);

  figure.globalAlpha = 1;
  stickman.src= 'img/ministick/'+ stick.state + stick.look + index + '.png';
  figure.drawImage(stickman, stick.x-64 - offset.x, stick.y-138 - offset.y, 128, 128);
};

function draw_enemy(enemy) {
  var index,
      enemy_img = new Image();

  if (enemy.state == 'death') {
    index= Math.floor(enemy.timer)%8;
    if (enemy.timer >= 8) {
      generate_enemy(enemy, 'enemy' + randint(1,4));
    }
  }

  if (enemy.state == 'getup') {
    index= Math.floor(enemy.timer)%4;
    if (enemy.timer > 4) {
      enemy.timer = 0;
      enemy.state = 'stand';
    }
  }
  if (enemy.state == 'looping' || enemy.state == 'jump') {
    index= Math.floor(enemy.timer/4)%4;
  }
  if (enemy.state == 'punch') {
    index= Math.floor(enemy.timer)%4;
    if (enemy.timer > 4) {
      enemy.timer = 0;
      enemy.state = ((enemy.type == 'enemy3' && Math.abs(enemy.x - stick.x) > enemy.range) ? 'charge2' : 'stand');
    }
  }
  if (enemy.state == 'punch2') {
    index= Math.floor(enemy.timer)%4;
    if (enemy.timer > 4) {
      enemy.timer = 0;
      enemy.state = 'stand';
    }
  }

  if (enemy.state == 'squat') {
    index= Math.floor(enemy.timer/2)%2;
  }
  if (enemy.state == 'stand') {
    index= Math.floor(chrono/16)%2;
  }
  if (enemy.state == 'walk' || enemy.state == 'float') {
    index= Math.floor(chrono/8)%2;
  }
  if (enemy.state == 'hurt' || enemy.state == 'charge' || enemy.state == 'charge2') {
    index= Math.floor(chrono/2)%2;
  }

  // ombre
  figure.globalAlpha = 0.25;
  figure.fillStyle = '#252525';
  figure.fillRect(enemy.x-30 + (len-enemy.y)/20 - offset.x, len-20, 60 - (len-enemy.y)/10, 7 - (len-enemy.y)/100);
  //barre de vie
  figure.fillStyle = '#7d872b';
  figure.fillRect(enemy.x-48 - offset.x, enemy.y-160- offset.y, 96, 15)
  figure.globalAlpha = 1;
  figure.fillStyle = '#ACBA3F';
  figure.fillRect(enemy.x-48 - offset.x, enemy.y-160- offset.y, enemy.health* 0.96, 15)
  figure.fillStyle = '#c6d45d';
  figure.fillRect(enemy.x-48 - offset.x, enemy.y-158- offset.y, enemy.health* 0.96, 5)

  enemy_img.src= 'img/' + enemy.type + '/' + enemy.state + enemy.look + index + '.png';
  figure.drawImage(enemy_img, enemy.x-64 - offset.x, enemy.y-138- offset.y, 128, 128);
};

function draw_plateforms() {
  for (let i= 0; i < pltfms.length; i++) {
    figure.fillStyle = '#757575';
    figure.fillRect(pltfms[i].x - offset.x, pltfms[i].y- offset.y, pltfms[i].dx, pltfms[i].dy);
  }
};

function draw_fx() {
  var index,
      fx = new Image();

  if (effect.type == 'land') {
    index= Math.floor(effect.timer*2/3)%4
    effect.timer++;
    if (index == 3) {
      effect.type = false;
      effect.timer = 0;
    }
  }
  if (effect.type == 'dash') {
    index= Math.floor(effect.timer)%8
    effect.timer++;
    if (index == 7) {
      effect.type = false;
      effect.timer = 0;
    }
  }

  if (effect.type == false) {
    return false;
  }
  fx.src= 'img/fx/'+ effect.type + stick.look + index + '.png';
  figure.drawImage(fx, effect.x - offset.x, effect.y- offset.y, effect.size, -effect.size);
};

function draw_stats() {
  var lvl = new Image();
  var img_kills = new Image();

  // barre de vie
  figure.fillStyle = '#757575869130';
  figure.fillRect(60, 32, 100 * 3, 24);
  figure.fillStyle = '#CBE310';
  figure.fillRect(60, 32, stick.health * 3, 24);

  // kills
  img_kills.src = 'img/main/kills.png';
  fx_high.drawImage(img_kills, len -100, 20, 24, 24);
  fx_high.fillStyle = 'white';
  fx_high.textAlign = 'left';
  fx_high.font = '30px Impact';
  fx_high.fillText(kills, len -70, 42.5, 24, 24);

  // focus
  //figure.fillRect(offset.x_focus -2, offset.y_focus -2, 4, 4);

  // lvl
  lvl.src = 'img/main/level' + (Math.trunc(stick.health/(100/7) + 0.9)) + '.png';
  fx_high.drawImage(lvl, 20, 20, 48, 48);
};

function draw_all() {
  pixel.clearRect(0, 0, len, len);
  draw_background();
  draw_plateforms();
  for (var i= 0; i < enemies.length; i++) {
    draw_enemy(enemies[i]);
  }
  draw_stick();
  draw_stats();
  draw_fx();
};

function animate_stick() {
  if (stick.state == 'jump' || stick.state == 'fall') {
    stick.timer++;
    if (stick.y >= len || stick.y_acc === 0) {
      stick.state = 'stand';
      effect.size = 100;
      effect.type = 'land';
      effect.y = stick.y - 10;
      effect.x = stick.x - 50;
      play_sound('land');
    }
  }
  else if (stick.state == 'uppercut' || stick.state == 'uppaircut' || stick.state == 'airkick') {
    stick.timer += 0.5;
    for (var i= 0; i < enemies.length; i++) {
      if (stick.timer == 5 && hit(stick, enemies[i])) {
        play_sound('hit');
      }
    }
  }
  else if (stick.state == 'punch' || stick.state == 'kick' || stick.state == 'brush') {
    stick.timer++;
    for (var i= 0; i < enemies.length; i++) {
      if (stick.timer == 4 && hit(stick, enemies[i])) {
        play_sound('hit');
      }
    }
  }
  else if (stick.state == 'hurt') {
    stick.timer++;
    if (Math.abs(stick.x_acc * 1.2) <= 0.5) {
      stick.timer = 0;
      stick.state = 'stand';
    }
  }
  else if (stick.state == 'dash' || stick.state == 'squatting') {
    stick.timer++;
  }
  else if (stick.state == 'death') {
    kills--;
    stick.y_acc -= 30;
    stick.state = 'looping';
  }
  else if (stick.state == 'looping') {
    stick.timer++;
    if (stick.y == len || stick.y_acc === 0) {
      stick.timer = 0;
      stick.state = 'dead';
    }
  }
  if (stick.x <= 40) {
    stick.x = 40
  }
};

function animate_enemy(enemy) {
  if ((enemy.state == 'stand' || enemy.state == 'walk') && (enemy.y == len || enemy.y_acc === 0)) {
    if (enemy.x - stick.x > enemy.range) {
      enemy.state = 'walk';
      enemy.look = '_l';
      enemy.x_acc = -enemy.speed;
    }
    else if (stick.x - enemy.x > enemy.range) {
      enemy.state = 'walk';
      enemy.look = '_r';
      enemy.x_acc = enemy.speed;
    }
    else if (enemy.state != 'charge' && enemy.state != 'punch' && Math.abs(stick.y - enemy.y) <= 50) {
      enemy.look = (stick.x < enemy.x) ? '_l' : '_r';
      enemy.state = 'charge';
      enemy.timer = 0;
    }
    else {
      if (stick.y < enemy.y) {
        enemy.timer = 0;
        enemy.look = (stick.x < enemy.x) ? '_l' : '_r';
        enemy.state = "squat";
      }
      else {
        enemy.state = "stand";
      }
    }
  }
  else if (enemy.state == 'squat') {
    enemy.timer += 0.2;
    if (enemy.timer >= 30 / enemy.speed) {
      enemy.state = 'jump';
      enemy.y_acc -= 30;
      enemy.x_acc = (enemy.look == '_l') ? -25 : 25;
      play_sound('jump_enemy');
    }
  }
  else if (enemy.state == 'jump' || enemy.state == 'fall') {
    if (enemy.y_acc < 0) {
      enemy.timer += 0.75;
    }
    if (enemy.y >= len || enemy.y_acc === 0) {
      enemy.state = 'stand';
      enemy.x_acc /= 2;
      effect.size = 100;
      effect.type = 'land';
      effect.y = enemy.y - 10;
      effect.x = enemy.x - 50;
      play_sound('land');
    }
  }
  else if (enemy.state == 'hurt') {
    enemy.timer++;
    if (Math.abs(enemy.x_acc) <= 0.5) {
      enemy.timer = 0;
      enemy.state = 'stand';
    }
  }
  else if (enemy.state == 'charge') {
    enemy.timer += 0.25;
    if (enemy.timer >= 40 / enemy.dexterity) {
      play_sound('whoosh_low');
      enemy.timer = 0;
      enemy.x_acc *= 10;
      enemy.state = 'punch';
    }
  }
  else if (enemy.state == 'charge2') {
    enemy.timer += 0.25;
    if (enemy.timer >= 20 / enemy.dexterity) {
      play_sound('whoosh_low');
      enemy.timer = 0;
      enemy.x_acc *= 10;
      enemy.state = 'punch2';
    }
  }
  else if (enemy.state == 'punch' || enemy.state == 'punch2') {
    enemy.timer += 0.25;
    if (enemy.timer == 2 && hit(enemy, stick)) {
      play_sound('hit');
      stick.x_acc = enemy.look == '_l' ? -5 : 5;
      if (enemy.type == 'enemy2') {
        enemy.x_acc = enemy.look == '_l' ? -30 : 30;
        stick.x_acc += enemy.look == '_l' ? -5 : 5;
      }
    }
  }
  else if (enemy.state == 'float' || enemy.state == 'looping') {
    enemy.timer++;
    if (enemy.y == len || enemy.y_acc === 0) {
      enemy.timer = 0;
      enemy.state = 'getup';
    }
  }
  else if (enemy.state == 'getup') {
    enemy.timer += 0.2;
  }
  else if (enemy.state == 'death') {
    enemy.timer += 0.75;
  }
};

// environnement
function gravity(obj) {
  obj.x_acc *= obj.friction;     // friction
  obj.y_acc += obj.gravity;
  obj.x += obj.x_acc;
  obj.y += obj.y_acc;

  obj.y_acc *= obj.y_acc > 0 ? 1.1 /*tombe*/ : 0.85 /*saute*/;

  if (obj.y >= len) {
    obj.y = len;
    obj.y_acc = -obj.y_acc /8;
  }

  if (obj['y_acc'] >= 0) {
    for (let i= 0; i < pltfms.length; i++) {
      if (pltfms[i].x <= obj['x'] && obj['x'] <= pltfms[i].x + pltfms[i].dx) {
        if (pltfms[i].y+10 <= obj['y'] && obj['y'] <= pltfms[i].y + pltfms[i].dy*5 + 10) {
          obj.y = pltfms[i].y+10;
          obj.y_acc = 0;
        }
      }
    }
  }
};

function vcam() {
  if (offset.x < 0) {      // limit left
    offset.x = 0;
  }
  if (offset.y > 0) {      // limit down
    offset.y = 0;
  }

  offset.x += (stick.x - (offset.x + offset.x_focus)) / 20;
  offset.y += (stick.y - (offset.y + offset.y_focus)) / 20;
};

function move_focus() {
  // SHIFT
  if (pressed[16]) {
    stick.state = 'squat';
    // LEFT, Q
    if ((pressed[37] || pressed[81]) && offset.x_focus < len - 150) {
      offset.x_acc++;
    }
    // RIGHT, D
    else if ((pressed[39] || pressed[68]) && offset.x_focus > 150) {
      offset.x_acc--;
    }
    // UP, Z
    else if ((pressed[38] || pressed[90]) && offset.y_focus < len - 150) {
      offset.y_acc++;
    }
    // DOWN, S
    else if ((pressed[40] || pressed[83]) && offset.y_focus > 150) {
      offset.y_acc--;
    }
    offset.y_acc *= 0.9;
    offset.x_acc *= 0.9;
    offset.x_focus += offset.x_acc;
    offset.y_focus += offset.y_acc;

    return true;
  }
  return false;
};

function move() {
  pressed.prev_touch ? pressed.timer++ : true;
  
  if (stick.state != 'squatting' && stick.state != 'brush' &&
      stick.state != 'uppercut'  && stick.state != 'hurt'  &&
      stick.state != 'looping'   && stick.state != 'dead'  && !move_focus()) {    
    // LEFT, Q
    if ((pressed[37] || pressed[81])) {
      if (stick.state == 'stand' || stick.state == 'squat') {
        stick.state = 'walk';
      }
      stick.look = '_l';
      stick.x_acc -= 2;
    }
    // RIGHT, D
    else if (pressed[39] || pressed[68]) {
      if (stick.state == 'stand' || stick.state == 'squat') {
        stick.state = 'walk';
      }
      stick.look = '_r';
      stick.x_acc += 2;
    }
    // DOWN, S
    else if (pressed[40] || pressed[83]) {
      stick.state = 'squat';
    }
    else if (stick.state == 'squat') {
      stick.state = 'stand';
    }
  }

  gravity(stick);
  animate_stick();

  for (var i= 0; i < enemies.length; i++) {
    animate_enemy(enemies[i]);
    gravity(enemies[i]);
  }
};

// interactions
function hit(punchr, vict) {
  var dist_x = punchr.x - vict.x;
  var dist_y = punchr.y - vict.y;

  if (vict.health == 0 || vict.invincible) {
    return false;
  }
  if (punchr.look == '_l' && -20 < dist_x && dist_x < 100) {
    if (-75 <= dist_y && dist_y <= 100) {
      if (punchr.state == 'uppercut' && 20 < dist_x) {
        vict.state = (vict.state == 'float' || vict.state == 'looping') ? 'looping' : 'float';
        vict.y -= 1;
        vict.y_acc -= (Math.abs(vict.y_acc) + 15) * 2.5;
        vict.health -= 10;
      }
      else if (punchr.state == 'airkick' && 30 < dist_x) {
        vict.state = 'hurt';
        vict.x_acc = - (Math.abs(vict.y_acc) + 20);
        vict.health -= 15;
      }
      else if ((punchr.state == 'punch' || punchr.state == 'punch2') && vict.state != 'getup' && vict.state != 'getup' && 20 < dist_x && dist_y <= 50) {
        vict.state = 'hurt';
        vict.x_acc -= 2;
        vict.health -= 5;
      }
      else if (punchr.state == 'kick' && 20 < dist_x) {
        if (vict.state == 'getup') {
          vict.y_acc -= 10;
          vict.x_acc -= 15;
          vict.state = 'looping';
          vict.health -= 10;
        }
        else {
          vict.state = 'hurt';
          vict.x_acc -= 4;
          vict.health -= 5;
        }
      }
      else if (punchr.state == 'brush' && -10 <= dist_y && dist_y <= 20) {
        vict.state = 'hurt';
        vict.y_acc -= 20;
        vict.x_acc -= 2;
        vict.health -= 5;
      }
      else if (punchr.state == 'uppaircut') {
        vict.state = 'looping';
        vict.y -= 1;
        vict.y_acc -= (Math.abs(vict.y_acc) + 15) * 2.5;
        vict.health -= 10;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
    offset.y -= 1;
    offset.x -= 2;
    vict.look = '_r';
  }
  else if (punchr.look == '_r' && -100 < dist_x && dist_x < 20) {
    if (-100 <= dist_y && dist_y <= 100) {
      if (punchr.state == 'uppercut' && dist_x < -20) {
        vict.state = (vict.state == 'float' || vict.state == 'looping') ? 'looping' : 'float';
        vict.y -= 1;
        vict.y_acc -= (Math.abs(vict.y_acc) + 15) * 3;
        vict.health -= 10;
      }
      else if (punchr.state == 'airkick' && dist_x < -30) {
        vict.state = 'hurt';
        vict.x_acc += Math.abs(vict.y_acc) + 20;
        vict.health -= 15;
      }
      else if ((punchr.state == 'punch' || punchr.state == 'punch2') && vict.state != 'getup' && dist_x < -20 && dist_y <= 50) {
        vict.state = 'hurt';
        vict.x_acc += 2;
        vict.health -= 5;
      }
      else if (punchr.state == 'kick' && dist_x < -20) {
        if (vict.state == 'getup') {
          vict.y_acc -= 10;
          vict.x_acc += 15;
          vict.state = 'looping';
          vict.health -= 10;
        }
        else {
          vict.state = 'hurt';
          vict.x_acc += 4;
          vict.health -= 5;
        }
      }
      else if (punchr.state == 'brush' && -10 <= dist_y && dist_y <= 20) {
        vict.state = 'hurt';
        vict.y_acc -= 20;
        vict.x_acc += 2;
        vict.health -= 5;
      }
      else if (punchr.state == 'uppaircut') {
        vict.state = 'looping';
        vict.y -= 1;
        vict.y_acc -= (Math.abs(vict.y_acc) + 15) * 3;
        vict.health -= 10;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
    vict.look = '_l';
    offset.y -= 1;
    offset.x += 2;
  }
  else {
    return false;
  }

  if (vict.health <= 0) {
    kills++;
    vict.state = 'death';
    play_sound('death');

    if (vict === stick) {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    }

  }
  return true;
};

function punch() {
  if (stick.state == 'squat' || stick.state == 'squatting') {
    stick.timer = 0;
    stick.state = 'uppercut';
  }
  else if (stick.state == 'jump') {
    stick.timer = 0;
    stick.y_acc = -35;
    stick.state = 'uppaircut';
  }
  else if (stick.state == 'stand') {
    stick.timer = 0;
    stick.state = 'punch';
  }
  else {
    return false;
  }
  return true;
};

function kick() {
  if (stick.state == 'squat' || stick.state == 'squatting') {
    stick.timer = 0;
    stick.state = 'brush';
  }
  else if (stick.state == 'jump') {
    stick.timer = 0;
    stick.y_acc -= 10;
    stick.state = 'airkick';
  }
  else if (stick.state == 'stand') {
    stick.timer = 0;
    stick.state = 'kick';
  }
  else {
    return false;
  }
  return true;
};

// système
function keydown(e) {
  e = e || event;
  pressed.prev = Object.assign({}, pressed);
  pressed[e.keyCode] = (e.type == 'keydown');

  // en gros, quand on appuie ou lache une touche, ce compteur redémarre.
  key_timer = size(pressed) == size(pressed.prev) ? key_timer + 1 : 0;

  if (stick.state == 'looping' || stick.state == 'dead') {
    return false;
  }
  
  // DOUBLE TAP
  if (e.keyCode == pressed.prev_touch && !pressed[16] && pressed.timer <= 30 ) {
    // LEFT, RIGHT
    if ((pressed.prev_touch == 37 || pressed.prev_touch == 68  ||
         pressed.prev_touch == 81 || pressed.prev_touch == 39) &&
         (stick.state == 'walk'   || stick.state == 'stand')) {
      stick.state = 'dash';
      effect.type = 'dash';
      effect.size = 96;
      effect.x = stick.look == '_l' ? stick.x : stick.x - 100;
      effect.y = stick.y - 10;
      stick.x_acc = stick.look == '_l' ? -50 : 50;
      play_sound('dash');
    }
    // DOWN, S
    else if ((pressed.prev_touch == 40 || pressed.prev_touch == 83) && stick.y != len) {
      stick.state = 'fall';
      stick.y += 50;
    }
    pressed.prev_touch = false;
    pressed.timer = 30;
    return true;
  }

  // SHIFT
  if (pressed[16]) {
    return false;
  }
  // C
  if (pressed[67]) {
    if (key_timer == 0 && punch()) {
      play_sound('whoosh');
    }
  }
  // V
  if (pressed[86]) {
    if (key_timer == 0 && kick()) {
      play_sound('whoosh_low');
    }
  }
  // DOWN, S
  if (pressed[40] || pressed[83]) {
    if (stick.state == 'jump' || stick.state == 'airkick' ||
        stick.state == 'fall' || stick.state == 'uppaircut') {
      stick.y_acc += 10;
    }

    else if (stick.state != 'brush' && stick.state != 'uppercut' && key_timer == 0) {
      stick.timer = 0;
      stick.state = 'squatting';
    }
  }
  // UP, Z
  if ((pressed[38] || pressed[90]) && (stick.state == 'stand' || stick.state == 'walk')) {
    stick.y -= 1;
    stick. timer = 0;
    stick.y_acc -= 40;
    stick.state = 'jump';
    play_sound('jump');
  }
  // M
  if (pressed[77]) {
    mute = !mute;
  }
  if (pressed[73]) {
    stick.invincible = true;
  }
};

function keyup(e) {
  e = e || event;
  pressed[e.keyCode] = (e.type != 'keyup');

  // quand on lâche ces touches, le mec reprend sa position initiale.
  
  // LEFT, RIGHT
  if (!(pressed[39] && pressed[37]) && stick.state == 'walk') {
    stick.state = 'stand';
  }
    // DOWN, S
  if (e.keyCode == 40 && stick.y_acc != 0) {
    stick.state = 'fall';
  }

  if (pressed.timer > 30) {
    pressed.prev_touch = false;
    pressed.timer = 0;
  }
  else {
    pressed.prev_touch = e.keyCode;
  }
};

// boucle principale
function anim() {
  move();
  vcam();
  chrono++;
  draw_all();
};

// initialisation
canvas.width = len;
canvas.height = len;
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

for (var i= 0; i < enemies.length; i++) {
  generate_enemy(enemies[i], 'enemy' + randint(1, 4));
};

window.setInterval(anim, 16);
