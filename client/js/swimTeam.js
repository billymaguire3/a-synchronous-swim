const SwimTeam = {

//   $(document).ready(function(){
//     $(".bg").css("background-image", "url('/css/images/css.jpg')");
//  });

  // direction, start and max all need to match the CSS
  direction: 'left',
  coords: { top: 100, left: 100 },
  max: { top: 0, left: 0, bottom: 295, right: 240 },

  setBackgroundImage: () => {

    let pool = document.getElementById('pool');
    let image = document.createElement('img');
    image.src = '/Users/quon/workspace2/hrsf130-a-synchronous-swim/client/js/water-sm.jpg'
    pool.appendChild(image);

  },

  move: (direction) => {
    if (!SwimTeam.valid(direction)) {
      return;
    }
    console.log(`Lets go: ${direction}`);

    // set the swim-team's direction
    $('.swimmer')
      .removeClass((idx, classNames) => {
        var name = classNames.match(/(turn-\w+)/);
        return name && name[1];
      })
      .addClass(`turn-${direction}`);

    // same direction as last time? -> if yes, move the swim-team
    if (SwimTeam.direction === direction) {
      SwimTeam.updateLoc(direction);
      $('.team')
        .css('top', `${SwimTeam.coords.top}px`)
        .css('left', `${SwimTeam.coords.left}px`);
    }

    SwimTeam.direction = direction;
  },

  valid: (direction) => {
    if (!direction) {
      return false;
    }
    if (['left', 'right', 'up', 'down'].indexOf(direction) < 0 ) {
      console.log(`Ignoring command: ${direction}`);
      return false;
    }
    return true;
  },

  updateLoc: (direction) => {
    // calculate what the new position is for the swim-team is
    // but don't let the swim-team get outside the max bounds!
    switch (direction) {
    case 'up':
      if (SwimTeam.coords.top > SwimTeam.max.top) {
        SwimTeam.coords.top -= 5;
      }
      break;
    case 'down':
      if (SwimTeam.coords.top < SwimTeam.max.bottom) {
        SwimTeam.coords.top += 5;
      }
      break;
    case 'left':
      if (SwimTeam.coords.left > SwimTeam.max.left) {
        SwimTeam.coords.left -= 5;
      }
      break;
    case 'right':
      if (SwimTeam.coords.left < SwimTeam.max.right) {
        SwimTeam.coords.left += 5;
      }
      break;
    }
  }

};
