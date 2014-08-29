window.onload = function () {
  var menuButton = document.getElementById('header__menu_button'),
      menu = document.getElementById('header__menu'),
      buttonsContainer = document.getElementsByClassName('links__buttons')[0],
      showMenuManager,
      hideMenuManager,
      tapButtonManager;

  if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  function isTappedOnMenu(node) {
    if (node && node.parentNode) {
      return node.id === 'header__menu' || isTappedOnMenu(node.parentNode);
    } else {
      return false;
    }
  }

  function removeClass(node, className) {
    var pos,
        classes = [],
        newClassName = '';

    pos = node && node.className ?
      node.className.indexOf(className) : -1;

    if (pos !== -1) {
      classes = node.className.split(' ');
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] !== className) {
          newClassName += classes[i] + ' ';
        }
      }
      node.className = newClassName.trim();
    }
  }

  function unselectSiblings(node) {
    var left, right;

    left = node.previousSibling;
    while(left) {
      removeClass(left, 'selected');
      left = left.previousSibling;
    }

    right = node.nextSibling;
    while(right) {
      removeClass(right, 'selected');
      right = right.nextSibling;
    }
  }

  showMenuManager = new Hammer(menuButton);
  showMenuManager.on('tap', function () {
    menu.style.display = 'block';

    hideMenuManager = new Hammer(document.body);
    hideMenuManager.on('tap', function (e) {
      if (!isTappedOnMenu(e.target)) {
        menu.style.display = '';
        hideMenuManager.destroy();
      }
    });
  });

  tapButtonManager = new Hammer(buttonsContainer);
  tapButtonManager.on('tap', function (e) {
    var target = e.target,
        links, i;

    unselectSiblings(target);
    if (target.className.indexOf('selected') == -1) {
      target.className = target.className.trim() + ' selected';

      var selectedClass = /android|ipad|iphone/i.exec(target.className);
      if (selectedClass) {
        selectedClass = selectedClass[0];
      }
      links = document.getElementsByClassName('links__mobile')[0].childNodes;
      for (i = 0; i < links.length; i++) {
        if (!links[i].className) {
          continue;
        } else if (links[i].className.indexOf(selectedClass) !== -1) {
          links[i].style.display = 'inline';
        } else {
          links[i].style.display = '';
        }
      }
    }
  });
};
