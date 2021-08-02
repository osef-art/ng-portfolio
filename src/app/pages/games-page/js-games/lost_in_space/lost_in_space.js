"use strict";

window.onload = function () {
var canvas = document.getElementById('game_area');
var bonus = canvas.getContext("2d");
var text = canvas.getContext("2d");
var pixel = canvas.getContext("2d");
var balles = canvas.getContext("2d");
var ennemis = canvas.getContext("2d");
var vaisseau = canvas.getContext("2d");

var wave = 1;
var time = 1;
var time_power = 0;
var framerate = 65;
var score = 0;
var pause = true;

const len = canvas.height
const nb_px = 35 // Nombre de "cases" sur le "plateau"
const px = len / nb_px
var theme = {
  light: '#404040',
  dark: '#353535'
}

var new_wave = function (wave) {
  var lst = []
  if (wave <= 3) {
    for (var i = (wave * 2 - 1) * 3; i > 1; i--) {
      if (i % 3 != 1) {
        for (var j = Math.floor(nb_px / 2) - 2; j > 3; j--) {
          if (j % 3 == 2) {
            lst.push({
              x: j,
              y: i,
              type: 'basic'
            })
          }
        }
        for (var j = Math.floor(nb_px / 2) + 4; j < nb_px - 3; j++) {
          if (j % 3 == 1) {
            lst.push({
              x: j,
              y: i,
              type: 'basic'
            })
          }
        }
      }
    }
  } else if (3 < wave && wave <= 8) {
    wave -= 3
    for (var i = 1; i <= 5 * 3; i++) {
      if (i % 3 != 1) {
        for (var j = Math.floor(nb_px / 2) - 2; j > 3; j--) {
          if (j % 3 == 2 && i <= wave * 3) {
            lst.push({
              x: j,
              y: i,
              type: 'armed'
            })
          } else if (j % 3 == 2) {
            lst.push({
              x: j,
              y: i,
              type: 'basic'
            })
          }
        }
        for (var j = Math.floor(nb_px / 2) + 4; j < nb_px - 3; j++) {
          if (j % 3 == 1 && i <= wave * 3) {
            lst.push({
              x: j,
              y: i,
              type: 'armed'
            })
          } else if (j % 3 == 1) {
            lst.push({
              x: j,
              y: i,
              type: 'basic'
            })
          }
        }
      }
    }
  } else {
    wave -= 3
    for (var i = wave * 3; i > 1; i--) {
      if (i % 3 != 1) {
        for (var j = Math.floor(nb_px / 2) - 2; j > 3; j--) {
          if (j % 3 == 2) {
            lst.push({
              x: j,
              y: i,
              type: 'armed'
            })
          }
        }
        for (var j = Math.floor(nb_px / 2) + 4; j < nb_px - 3; j++) {
          if (j % 3 == 1) {
            lst.push({
              x: j,
              y: i,
              type: 'armed'
            })
          }
        }
      }
    }
  }
  return lst
}

var pos_ship = {x: Math.floor(nb_px / 2) + 1, y: nb_px - 1}
var pos_aliens = new_wave(wave)
var pos_bullets = []
var pos_al_bullets = []
var pos_bonus = []
var pos_dead = []
var powers = {
  ghost: false,
  speed: false,
  laser: false,
  freeze: false,
  triple: false,
  unlimited: false
}
  
var message = ["On commence en douceur. 😌",
                "C'est facile hein? 😏",
                "Attention, des ennemis armés approchent ! 😳",
                "Esquivez les balles ennemies ! 😆",
                "Profitez du jeu tant qu'il n'est pas encore trop dur. 😈",
                "N'oubliez pas de ramasser des power-ups ! 😜",
                "Attention à ne pas vous faire tuer par vos propres balles 😐",
                "Vous êtes persévérant. 😏",
                "Je saurais pas trop comment rendre ce jeu plus difficile.. 🙄",
                "Vous pouvez abandonner à tout moment, vous savez 😅",
                "Vous êtes toujours là ?",
                "Bravo à vous d'être arrivé aussi loin. 👏",
                "Bien entendu, tout prendra fin maintenant.",
                "Ce fût un plaisir. 🙂",
                "🙃"]

var randint = function (inf, sup) {

  return Math.floor(Math.random() * (sup + 1 - inf)) + inf
}

var random_power = function () {
  var lst = Object.keys(powers)
  return lst[randint(1, lst.length) - 1]
}

function play_sound(file) {
  let sound = new Audio();
  if (file == "game_over") {
    play_sound("explosion")
    play_sound("shut_down")
  } else if (file == "impact") {
    let num = randint(0, 5)
    file += num.toString()
  } else if (file == "infinite") {
    let num = randint(0, 4)
    file += num.toString()
  } else if (file == "shot") {
    let num = randint(0, 1)
    file += num.toString()
  }
  sound.src = "sounds/" + file + ".wav"
  sound.play();
}

// affichage
function dessine_pixels() {
  for (let x = 0; x < nb_px; x++) {
    for (let y = 0; y < nb_px; y++) {
      if (x % 2 == y % 2) {
        var pix_color = theme['light']
      } else {
        var pix_color = theme['dark']
      }
      pixel.globalAlpha = y / nb_px;
      pixel.fillStyle = pix_color;
      pixel.fillRect(x * px, y * px, px, px);
    }
  }
  pixel.globalAlpha = 1;
}

function starship(pos, time) {
  var x = pos['x']
  var y = pos['y']
  var index = time % 4

  if (powers['ghost'] == true) {
    vaisseau.globalAlpha = 0.5
  }
  var img_vaisseau = new Image();
  img_vaisseau.src = "img/starship" + index + ".png"
  vaisseau.drawImage(img_vaisseau, (x - 2) * px, (y - 2) * px, 3 * px, 3 * px)
  vaisseau.globalAlpha = 1
}

function bullets(lst) {
  for (var i in lst) {
    var pos = lst[i]
    var x = pos['x']
    var y = pos['y']
    if (y < 1) {
      delete lst[i]
    } else if (pos['start_y'] - y > nb_px / 2) {
      delete lst[i]
      var pop = new Image();
      pop.src = "img/pop.png"
      balles.drawImage(pop, (x - 1) * px, (y - 1) * px, px, px)
      continue
    }
    balles.fillStyle = "white"
    balles.fillRect((x - 0.6) * px, (y - 0.6) * px, 0.2 * px, 0.2 * px);
  }
}

function alien_bullets(lst, time) {
  for (var i in lst) {
    var pos = lst[i]
    var x = pos['x']
    var y = pos['y']

    if (y > nb_px) {
      delete lst[i]
    }

    if (time % 2 == 0) {
      var color = "#FFC1C9"
    } else {
      var color = "#FF586E"
    }
    balles.fillStyle = color
    balles.fillRect((x - 0.6) * px, (y - 0.6) * px, 0.2 * px, 0.2 * px);
  }
}

function aliens(lst, time) {
  for (var i in lst) {
    var pos = lst[i]
    var x = pos['x']
    var y = pos['y']
    var index = time % 8

    if (pos['type'] == 'armed') {
      index = "_a" + index
    }

    if (x <= 1) {
      pos['y'] += 1
      pos['x'] += 1
    } else if (x >= nb_px) {
      pos['y'] += 1
      pos['x'] -= 1
    }

    var alien = new Image();
    alien.src = "img/invader" + index + ".png"
    ennemis.drawImage(alien, (x - 1.5) * px, (y - 1.5) * px, 2 * px, 2 * px)
  }
}

function dead_anim(lst, time) {
  for (var i in lst) {
    var pos = lst[i]
    var x = pos['x']
    var y = pos['y']
    var index = time % 2

    if (pos['type'] == 'armed') {
      index += 2
    }

    var alien = new Image();
    alien.src = "img/invader_dead" + index + ".png"
    ennemis.drawImage(alien, (x - 1.5 + index * 0.1) * px, (y - 1.5) * px, 2 * px, 2 * px)
  }
}

function draw_bonus(lst, time) {
  for (var i in lst) {
    var pos = lst[i]
    var x = pos['x']
    var y = pos['y']

    if (pos['type'] == 'bonus') {
      var power = pos['power']
      var index = time % 8

      var box = new Image();
      box.src = "img/box_" + power + index + ".png"
      bonus.drawImage(box, (x - 1.5) * px, (y - 1.5) * px, 2 * px, 2 * px)

    } else if (pos['type'] == 'alert') {
      var index = time % 2
      bonus.globalAlpha = 0.5 + index * 0.5
      var box = new Image();
      box.src = "https://static1.squarespace.com/static/" +
        "572be4548a65e29234a6fb62/576709e3d482e92ff40e633a/" +
        "595aca13e3df281b3a922870/1499122196148/Question%2BMark%2BBox.png"
      bonus.drawImage(box, (x - 1) * px, (y - 1) * px, px, px)
      bonus.globalAlpha = 1
    }
  }
}

function print_stats() {
  text.textAlign = 'center'
  text.fillStyle = "white";
  text.font = "20px Impact";
  text.fillText("WAVE", 50, len - 50);
  text.fillText(wave, 50, len - 25);
  text.fillText("SCORE", len - 50, len - 50);
  text.fillText(score, len - 50, len - 25);

  if (pause == true) {
    var play_b = new Image();
    play_b.src = "https://blog.puydufou.com/wp-content/uploads/2017/07/pausebutton.png"
    text.globalAlpha = 0.75
    text.fillText("APPUYEZ SUR UNE TOUCHE POUR CONTINUER", len / 2, len / 2 + 25);
    text.drawImage(play_b, len / 2 - 25, len / 2 + 50, 50, 50)
    text.globalAlpha = 1

    if (time == 1) {
      text.fillText(message[wave - 1], len / 2, 5 * len / 6);
      text.fillStyle = "#8263E5";
      text.font = "50px Impact";
      text.fillText("- WAVE " + wave + " -", len / 2, len / 2);
    }
  }

  for (var power in powers) {
    if (powers[power] == true) {
      text.globalAlpha = 0.5
      text.font = "50px Impact";
      text.fillText(power.toUpperCase(), len / 2, len / 3);
      text.font = "200px Impact";
      text.fillText(Math.floor(time_power / 10), len / 2, 2 * len / 3);
      text.globalAlpha = 1
    }
  }
}

// système
function mise_a_jour() {
  print_stats()
  pos_al_bullets = clean(pos_al_bullets)
  pos_bullets = clean(pos_bullets)
  pos_aliens = clean(pos_aliens)

  draw_bonus(pos_bonus, time)
  aliens(pos_aliens, time)
  dead_anim(pos_dead, time)
  alien_bullets(pos_al_bullets, time)
  bullets(pos_bullets)
  starship(pos_ship, time);
  detect_end(pos_ship)
}

function clean(lst) {
  var nouv_lst = [];
  for (var i = 0; i < lst.length; i++) {
    if (lst[i]) {
      nouv_lst.push(lst[i]);
    }
  }
  return nouv_lst;
}

function help_popup() {
  alert([
    "                                           👾  LOST IN SPACE  👾", "",
    "➡️⬅️⬇️⬆️  pour déplacer le vaisseau",
    "[SPACEBAR]  pour tirer une balle 🌟",
    "Tirez des balles sur les aliens 👾, tout en esquivant leurs projectiles! 💀",
    "⚠️ Les balles disparaissent au bout d'un certain temps. 🕑",
    "Attention: elles peuvent vous tuer aussi! 💥",
    "Ramassez des power-ups 🆙, ça peut aider ;)",
  ].join('\n'))
}

function deplacements(event) {
  var e = event.keyCode;
  pixel.clearRect(0, 0, 600, 600)
  dessine_pixels()

  let x = pos_ship['x']
  let y = pos_ship['y']

  if (powers['speed'] == true) {
    var move = 2
  } else {
    var move = 1
  }

  if (e != 80) { // P
    pause = false
  }
  if (e == 72) { // H
    help_popup()
  }
  if (e == 37 && x > 1) { // GAUCHE
    x -= move;
  }
  if (e == 39 && x < nb_px) { // DROITE
    x += move;
  }
  if (e == 38 && y > 1) { // HAUT
    y -= move;
  }
  if (e == 40 && y < nb_px) { // BAS
    y += move;
  }

  pos_ship['x'] = x
  pos_ship['y'] = y

  mise_a_jour()
}

function tirs(event) {
  var e = event.keyCode;
  pixel.clearRect(0, 0, 600, 600)
  dessine_pixels()

  let x = pos_ship['x']
  let y = pos_ship['y']

  if (e == 80) { // P
    pause = !pause
    play_sound("pause")
  } else if (e == 32) { // SPACEBAR
    pause = false
    pos_bullets.push({
      x: x,
      y: y - 1,
      start_y: y - 1
    });
    if (powers['triple'] == true) {
      play_sound("blast")
      pos_bullets.push({
        x: x - 1,
        y: y - 1,
        start_y: y - 1
      });
      pos_bullets.push({
        x: x + 1,
        y: y - 1,
        start_y: y - 1
      });
    } else if (powers['laser'] == true) {
      play_sound("laser")
      balles.fillRect((x - 0.6) * px, (y - 0.6) * px, 0.2 * px, (-600) * px);
    } else {
      play_sound("shot")
    }
  }
  mise_a_jour()
}

function detect_end(ship) {
  if (typeof (ship) != 'object') {
    window.removeEventListener('keydown', deplacements)
    window.removeEventListener('keyup', tirs)
    theme = {
      light: '#6D2727',
      dark: '#522424'
    }

    text.font = "100px Impact";
    text.fillStyle = "red";
    text.fillText("GAME OVER", len / 2, len / 2 + 5);
    text.fillStyle = "white";
    text.fillText("GAME OVER", len / 2, len / 2);
    text.font = "25px Impact";
    text.fillText("😵 Rafraîchissez la page pour rejouer 😵", len / 2, len / 2 + 50);
    return true
  }
  return false
}

window.addEventListener('keydown', deplacements)
window.addEventListener('keyup', tirs)

function anim() {
  pixel.clearRect(0, 0, 600, 600)
  dessine_pixels()

  if (pause == false) {
    time += 1
    time_power -= 1

    // interactions des balles
    for (var i in pos_bullets) {
      var bullet = pos_bullets[i]
      bullet['y'] -= 1

      for (var j in pos_aliens) {
        var alien = pos_aliens[j]

        if (bullet['x'] == alien['x']) {
          if (powers['laser'] == true || bullet['y'] == alien['y']) {
            play_sound("impact")
            pos_dead.push(pos_aliens[j])
            delete pos_bullets[i]
            delete pos_aliens[j]
            if (alien['type'] == 'armed') {
              score += 3
            } else {
              score += 1
            }
          }
        }
        if (bullet['x'] == pos_ship['x'] && bullet['y'] == pos_ship['y'] && powers['ghost'] == false) {
          console.log("t'es mort")
          play_sound("game_over")
          pos_ship = NaN
        }
      }
    }
    for (var i in pos_al_bullets) {
      var bullet = pos_al_bullets[i]
      bullet['y'] += 1

      // mort du vaisseau
      if (bullet['x'] == pos_ship['x'] && bullet['y'] == pos_ship['y'] && powers['ghost'] == false) {
        play_sound("game_over")
        pos_ship = NaN
      }
    }
    if (powers['unlimited'] == true) {
      pos_bullets.push({
        x: pos_ship['x'],
        y: pos_ship['y'] - 1,
        start_y: 0
      });
      play_sound("infinite")
    }

    // interaction des aliens
    for (var j in pos_aliens) {
      var alien = pos_aliens[j]
      if (alien['x'] == pos_ship['x'] && alien['y'] == pos_ship['y'] && powers['ghost'] == false) {
        play_sound("game_over")
        pos_ship = NaN
      }
    }

    // ramassage de power-ups
    for (var i in pos_bonus) {
      var bonus = pos_bonus[i]

      if (-1 <= bonus['x'] - pos_ship['x'] && bonus['x'] - pos_ship['x'] <= 1 && bonus['y'] == pos_ship['y']) {
        score += 10
        let power = bonus["power"]
        powers[power] = true
        play_sound("power")
        pos_bonus = []

        var time_p = function (power) {
          if (power == 'laser') {
            time_power = 50
            theme = {
              light: '#5A4D63',
              dark: '#493F51'
            }
          } else if (power == 'triple') {
            time_power = 50
            theme = {
              light: '#557865',
              dark: '#426754'
            }
          } else if (power == 'unlimited') {
            time_power = 50
            theme = {
              light: '#6F7252',
              dark: '#626544'
            }
          } else if (power == 'freeze') {
            time_power = 70
            theme = {
              light: '#4E7675',
              dark: '#416766'
            }
          } else if (power == 'ghost') {
            time_power = 80
            theme = {
              light: '#5E5F7A',
              dark: '#55566D'
            }
          } else if (power == 'speed') {
            time_power = 100
            theme = {
              light: '#7D854D',
              dark: '#686F3F'
            }
          }
        }
        time_p(power)
      }
    }
    if (pos_bonus.length == 1) {
      var box = pos_bonus[0]
      if (box['type'] == 'bonus') {
        if (box['y'] > nb_px) {
          pos_bonus = []
        } else {
          box['y'] += 1
        }
      }
    }

    // fin du jeu
    if (pos_aliens.length == 0 && detect_end(pos_ship) == false) {
      pause = true
      wave += 1
      play_sound("level_cleared")

      time = 1
      time_power = 0
      framerate -= 2

      pos_ship = {
        x: Math.floor(nb_px / 2) + 1,
        y: nb_px - 1
      }
      pos_al_bullets = []
      pos_bullets = []
      pos_bonus = []
      pos_dead = []
      pos_aliens = new_wave(wave)
      for (var i in powers) {
        powers[i] = false
        theme = {
          light: '#404040',
          dark: '#353535'
        }
      }
    }

    // déplacement des objets en fonction du temps
    if (time_power == 0) { // disparition du power-up
      for (var i in powers) {
        powers[i] = false
        theme = {
          light: '#404040',
          dark: '#353535'
        }
      }
    }
    if (time % 200 == 100) { // apparition des bonus
      var box = pos_bonus[0]
      box['type'] = 'bonus'
      box['power'] = random_power()
    }
    if (time % 200 == 75) { // disparition de l'alerte
      var box = pos_bonus[0]
      box['type'] = NaN
    }
    if (time % 200 == 50) { // alerte de bonus
      pos_bonus.push({
        x: randint(1, nb_px),
        y: 1,
        type: 'alert'
      })
    }
    if (time % (Math.floor(100 / wave)) == 0) { // tirs ennemis
      if (pos_aliens.length > 16) {
        var alien = pos_aliens[randint(0, 16)]
      } else {
        var alien = pos_aliens[randint(0, pos_aliens.length - 1)]
      }
      if (alien['type'] == "armed" && powers['freeze'] == false) {
        play_sound("alien_shot")
        pos_al_bullets.push({
          x: alien['x'],
          y: alien['y'] + 1
        })
      }
    }
    if (time % 10 == 0 && powers['freeze'] == false) { // deplacement des aliens
      for (var i in pos_aliens) {
        var pos = pos_aliens[i]
        if (pos['y'] % 2 == 1) {
          pos['x'] += 1
        } else {
          pos['x'] -= 1
        }
      }
    }
    if (time % 7 == 0) {
      pos_dead = []
    }
  }
  mise_a_jour()
}

var timer = setInterval(anim, framerate);
}
