window.onload = function() {
  var canvas = document.getElementById('game_area');
  var carre = canvas.getContext("2d");
  var pixel = canvas.getContext("2d");
  var text = canvas.getContext("2d");
  var bg = canvas.getContext("2d");

  var wave = 1;
  var time = 1;
  var delay = 1;
  var score = 0;
  var pause = false;

  const height = canvas.height;
  const haut_px = 20;
  const larg_px = 10;
  const px = height/haut_px;
  var theme = {light: '#404040', dark: '#353535', random: 0};
  var shapes = ["L","J","S","Z","I","T","X"];

  var randint = function(inf, sup) {
    return Math.floor(Math.random() * (sup + 1 - inf)) + inf
  }

  var new_block = function(shape) {
    
    if (typeof shape === 'undefined') {
      var shape = shapes[randint(1, shapes.length)-1]
    }

    if (shape == "L") {
      return {cubes:[{x:5, y:1, c:true},{x:4, y:1},{x:6, y:1},{x:6, y:0}], shape: shape, color:'#4be59d'}
    } else if (shape == "J") {
      return {cubes:[{x:5, y:1, c:true},{x:4, y:1},{x:6, y:1},{x:4, y:0}], shape: shape, color:'#2ba183'}
    } else if (shape == "S") {
      return {cubes:[{x:5, y:0},{x:5, y:1, c:true},{x:4, y:1},{x:6, y:0}], shape: shape, color:'#8474d3'}
    } else if (shape == "Z") {
      return {cubes:[{x:5, y:0, c:true},{x:5, y:1},{x:4, y:0},{x:6, y:1}], shape: shape, color:'#5187dd'}
    } else if (shape == "I") {
      return {cubes:[{x:3, y:0},{x:4, y:0, c:true},{x:5, y:0},{x:6, y:0}], shape: shape, color:'#d9ef2f'}
    } else if (shape == "T") {
      return {cubes:[{x:5, y:1, c:true},{x:4, y:1},{x:6, y:1},{x:5, y:0}], shape: shape, color:'#ef4a70'}
    } else if (shape == "X") {
      return {cubes:[{x:4, y:1},{x:4, y:0},{x:5, y:1},{x:5, y:0, c:true}], shape: shape, color:'#2f984e'}
    }
  }
  
  var build_block_pile = function() {
    lst= []
    for (i=0; i<haut_px; i++){
      lst.push([])
    }
    return lst
  }
  
  var contact = function(cube, lst) {
    for (i in lst) {
      for (j in lst[i]) {
        bloc = lst[i][j]
        if (bloc['x'] == cube['x'] && bloc['y'] == cube['y']) {
          return true
        }
      }
    }
    return false
  }
  
  var clean = function(lst) {
    var nouv_lst = [];
    for (i in lst) {
      if (lst[i].length==0 || !lst[i]) {
        nouv_lst.unshift([]);
      } else {
        for (j in lst[i]) {
          cube= lst[i][j]
          cube['y']= i
        }
        nouv_lst.push(lst[i])
      }
    }
    return nouv_lst;
  }

  var play_sound = function(file) {
    let sound = new Audio();
    if (file == "game_over") {
      play_sound("explosion")
    } else if (file == "impact") {
      let num = randint(0, 2)
      file += num.toString()
    } else if (file == "flip") {
      let num = randint(0, 2)
      file += num.toString()
    }
    sound.src = "sounds/" + file + ".wav"
    sound.play();
  }
  
  
  // affichage
  function draw_pixels() {
    for (let x = 0; x < larg_px; x++) {
      for (let y = 0; y < haut_px; y++) {
        if (x % 2 == y % 2) {
          var pix_color = theme['light']
        } else {
          var pix_color = theme['dark']
        }
        pixel.fillStyle = pix_color;
        pixel.fillRect(x*px, y*px, px, px);
      }
    }
  }

  function draw_block(block) {
    for (var i in block['cubes']) {
      var cube= block['cubes'][i]

      var x = cube['x']
      var y = cube['y']
    
      carre.fillStyle = block['color'];
      carre.fillRect(x*px+1, y*px+1, px-2, px-2);
    }
  }
  
  function draw_preview(block) {
    prev= preview(block['cubes'])
    while (contact_bottom(prev['bottom'])==false) {
      test= prev['bottom']
      prev= preview(test)
    }
    carre.globalAlpha= 0.25
    draw_block({cubes: test, color:'white'})
    carre.globalAlpha= 1
  }
  
  function draw_pile(cubes) {
    for (var i in cubes) {
      for (var j in cubes[i]) {
        var cube= cubes[i][j]
        var x = cube['x']
        var y = cube['y']
        
        carre.globalAlpha= 0.75
        carre.fillStyle = cube['color'];
        carre.fillRect(x*px, y*px, px, px);
        carre.globalAlpha= 1
        carre.fillStyle = cube['color'];
        carre.fillRect(x*px+2, y*px+2, px-4, px-4);
      }
    }
  }

  function draw_stats(time) {
    if (inventory['hold'] != 'blank') {
      index= time%8;
    } else {
      index= ''
    }
    
    text.fillStyle = "white";
    text.textAlign = "left";
    text.font = "30px Impact";
    text.fillText("NEXT", (haut_px-larg_px+1)*px, (haut_px/4)*px); 
    text.fillText("HOLD", (haut_px-larg_px+1)*px, (haut_px/2)*px);
    text.fillText(score, (haut_px-larg_px+1)*px, (haut_px-1)*px);
    text.fillStyle = "rgba(255, 255, 255, 0.7)";
    text.fillText("SCORE", (haut_px-larg_px+1)*px, (haut_px-2)*px);
    
    next = new Image();
    next2 = new Image();
    hold_ = new Image();
    next.src = "img/" + inventory['next']['shape'] + ".png";
    next2.src = "img/" + inventory['next2']['shape'] + ".png";
    hold_.src = "img/" + inventory['hold'] + index + ".png";
    text.drawImage(next, (haut_px-larg_px)*px, 0, 4*px, 4*px);
    text.drawImage(next2, (haut_px-larg_px+3)*px, 0, 4*px, 4*px);
    if (!hold) {
      text.globalAlpha = 0.25;
    }
    text.drawImage(hold_, (haut_px-larg_px)*px, (haut_px/3-1)*px, 4*px, 4*px);
    text.globalAlpha = 1;
  }

  function random_gradient() {
    var gradient = text.createLinearGradient(0, 0, (larg_px-1)*px, (haut_px-1)*px);
    
    if (theme['random']  == 0) {
      theme['random']  = randint(1, 2);
    }

    if (theme['random']  == 1) {
      gradient.addColorStop(0, '#652bbc');
      gradient.addColorStop(1, '#e0356b');
    } else if (theme['random']  == 2) {
      gradient.addColorStop(0, '#0ddbcd');
      gradient.addColorStop(1, '#39e58f');
    }
      
    return gradient;
  }

  function draw_pause() {
    if (pause) {
      text.fillStyle = random_gradient();
      text.textAlign = "center";
      text.fillRect(px/2, px/2, (larg_px-1)*px, (haut_px-1)*px);

      text.fillStyle = "rgba(255, 255, 255, 0.8)";
      text.font = "30px Impact";
      text.fillText("Press 'P' to continue", (larg_px/2)*px, (haut_px/2)*px);

      text.fillStyle = "white";
      text.font = "80px Impact";
      text.fillText("PAUSE", (larg_px/2)*px, (haut_px/2)*px -50);
    }
  }

  // interactions
  function contact_right(cubes) {
    for (i in cubes) {
      cube = cubes[i]
      if (cube['x'] > larg_px-1 || contact(cube, block_pile)) {
        return true
      }
    }
    return false
  }
  
  function contact_left(cubes) {
    for (i in cubes) {
      cube = cubes[i]
      if (cube['x'] <0 || contact(cube, block_pile)) {
        return true
      }
    }
    return false
  }
  
  function contact_bottom(cubes) {
    for (i in cubes) {
      cube = cubes[i]
      if (cube['y'] >haut_px-1 || contact(cube, block_pile)) {
        return true
      }
    }
    return false
  }
  
  function preview(cubes) {
    left= []
    right= []
    bottom= []
    for (i in cubes) {
      cube = cubes[i]
      x= cube['x']
      y= cube['y']
      if (cube['c']){
        left.push({x:x-1, y:y, c:true})
        right.push({x:x+1, y:y, c:true})
        bottom.push({x:x, y:y+1, c:true})
      } else {
        left.push({x:x-1, y:y})
        right.push({x:x+1, y:y})
        bottom.push({x:x, y:y+1})
      }
    }
    return {left:left, right:right, bottom:bottom}
  }
  
  function flip(cubes) {
    for (i in cubes) {
      cube= cubes[i]
      if (cube['c']) {
        var x = cube['x']
        var y = cube['y']
        new_cubes= [{x:x,y:y,c:true}]
        
        for (j in cubes) {
          bloc= cubes[j]
          if (bloc == cube){
            continue
          }
          var a = bloc['x']
          var b = bloc['y']
          
          if (block['shape'] != 'I') {
                   if (b == y-1 && a == x-1){   // no
              new_cubes.push({x:a+2, y:b})
            } else if (b == y-1 && a == x  ){   // n
              new_cubes.push({x:a+1, y:b+1})
            } else if (b == y-1 && a == x+1){   // ne
              new_cubes.push({x:a, y:b+2})
            } else if (b == y   && a == x+1){   // e
              new_cubes.push({x:a-1, y:b+1})
            } else if (b == y+1 && a == x+1){   // se
              new_cubes.push({x:a-2, y:b})
            } else if (b == y+1 && a == x  ){   // s
              new_cubes.push({x:a-1, y:b-1})
            } else if (b == y+1 && a == x-1){   // so
              new_cubes.push({x:a, y:b-2})
            } else if (b == y   && a == x-1){   // o
              new_cubes.push({x:a+1, y:b-1})
            }
          } else {
            if (a == x) {
              new_cubes= [{x:x,y:y,c:true},{x:x-1,y:y},{x:x+1,y:y},{x:x+2,y:y}]
            } else if (b == y) {
              new_cubes= [{x:x,y:y,c:true},{x:x,y:y-1},{x:x,y:y+1},{x:x,y:y+2}]
            }
            break
          }
        }
        play_sound('flip')
        return new_cubes
      }
    }
  }
  
  function reposition(cubes) {
    while (contact_left(cubes)){
      for (i in cubes) {
        cube= cubes[i]
        cube['x'] += 1
      }
    }
    while (contact_right(cubes)){
      for (i in cubes) {
        cube= cubes[i]
        cube['x'] -=1
      }
    }
    return cubes
  }
  
  function block_to_pile(block, pile) {
    for (i in block['cubes']){
      cube= block['cubes'][i]
      lst= pile[cube['y']]
      lst.push({x:cube['x'], y:cube['y'], color: block['color']})
    }
    return clean(pile)
  }
  
  function delete_lines(pile) {
    var lines= 0
    for (e in pile) {
      if (pile[e].length >= larg_px) {
        pile[e] = []
        lines+=1
      }
    }
    if (lines == 4) {
      play_sound('tetris')
    } else if (lines > 0) {
      play_sound('line');
    }
    score += 1000*lines*(lines+1)/2;
    return clean(pile);
  }
  
  // système
  function mise_a_jour() {
    block_pile= delete_lines(block_pile);
    
    draw_pile(block_pile);
    draw_preview(block);
    draw_block(block);
    draw_stats(time);
  }

  function moves(event) {
    var e = event.keyCode;
    pixel.clearRect(0, 0, canvas.width, canvas.height)
    draw_pixels()
    
    var prev = preview(block['cubes'])
    
    if (e == 37) {    // GAUCHE
      test= prev['left']
      if (!contact_left(test)) {
        block['cubes']=test
        play_sound('move')
      }
    }
    
    if (e == 39) {    // DROITE
      test= prev['right']
      if (!contact_right(test)) {
        block['cubes']=test
        play_sound('move')
      }
    }
    
    if (e == 40) {    // BAS
      test= prev['bottom']
      if (!contact_bottom(test)) {
        block['cubes']= test;
        delay= Math.floor(delay/10)*10;
        score += 5;
      } else {
        delay= Math.floor(delay/10)*10 -1;
      }
    }
    
    if (e == 38) {    // HAUT
      block['cubes'] = flip(block['cubes'])
      block['cubes'] = reposition(block['cubes'])
    }
    
    mise_a_jour()
  }
  
  function events(event) {
    var e = event.keyCode;
    pixel.clearRect(0, 0, canvas.width, canvas.height)
    draw_pixels()
    
    var prev = preview(block['cubes'])

    if (e == 32) {    // SPACEBAR
      play_sound('whoosh')
      while (contact_bottom(prev['bottom']) == false) {
        test= prev['bottom']
        prev= preview(test)
      }
      block['cubes']=test
      delay= Math.floor(delay/10)*10 -1 
    }
    if (e == 66 || e == 86 || e == 78) {    // C, V, B
      if (hold  && inventory['hold'] != block['shape']) {
        if (inventory['hold'] == 'blank') {
          inventory['hold'] = block['shape']
          block= inventory['next']
          inventory['next'] = inventory['next2']
          inventory['next2'] = new_block()
        } else {
          shape= inventory['hold']
          inventory['hold'] = block['shape']
          block = new_block(shape)
          hold= false
        }
        play_sound('swap')
      } else {
        play_sound('cant')
      }
    }
    mise_a_jour()
  }
  
  function toggle_pause(event) {
    var e = event.keyCode;
    pixel.clearRect(0, 0, canvas.width, canvas.height)
    draw_pixels()
    
    var prev = preview(block['cubes'])
    
    if (e == 80) { // P
      pause = !pause

      if (pause) {
        play_sound("pause");
        window.removeEventListener('keydown', moves)
        window.removeEventListener('keyup',  events)
      } else {
        theme['random'] = 0;
        window.addEventListener('keydown', moves)
        window.addEventListener('keyup',  events)
      }
    }
    mise_a_jour()
  }
  

  window.addEventListener('keydown', moves)
  window.addEventListener('keyup',  events)
  window.addEventListener('keyup', toggle_pause)
  
  // INITIALISATION
  
  block= new_block();
  hold= true;
  block_pile= build_block_pile();
  inventory= {next: new_block(), next2: new_block(), hold: 'blank'};

  

  function anim() {
    pixel.clearRect(0, 0, canvas.width, canvas.height);
    draw_pixels();
    time += 1;
    
    mise_a_jour()
    if (!pause) {
      delay += 1;
      var cubes = block['cubes'];
      var prev= preview(cubes);
      
      for (i in cubes) {
        cube = cubes[i];
        if (contact(cube, block_pile)) {
          pause = true;
          
          window.removeEventListener('keydown', moves);
          window.removeEventListener('keyup',  events);
          window.removeEventListener('keyup', toggle_pause);
          play_sound('game_over');
        }
      }
      
      if (block_pile[3].length == 0) {
        theme['light']= '#404040';
        theme['dark']= '#353535';
      } else {
        theme['light']= '#3c2525';
        theme['dark']= '#2b1919';
        if (time%20 == 0) {
          play_sound('alarm');
        }
      }

      if (delay%10 == 0) {
        if (!contact_bottom(prev['bottom'])) {  
          for (i in cubes) {
            cube= cubes[i];
            cube['y'] +=1;
          }
        } else {
          hold= true
          block_pile= block_to_pile(block, block_pile);
          block= inventory['next'];
          score += 10;
          setTimeout(function() {play_sound('impact')}, 125);
          inventory['next'] = inventory['next2'];
          inventory['next2'] = new_block();
        }
      }
    } else {
      draw_pause();
    }
    
  }

  var timer = setInterval(anim, 50);
}