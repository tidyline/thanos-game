window.onload = function () {
  var originData = null,
    originLength = null,
    data = null,
    particleOptions = null,
    gameStep = ["start", "particle"].values(),
    shuffle = function (array) {
      var j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    },
    loadJSON = function (path, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path);
      xhr.onreadystatechange = function (data) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (cb) cb(JSON.parse(data.currentTarget.response));
          } else {
            console.log("Error " + xhr.status);
          }
        }
      };
      xhr.send();
    },
    getStep = function (length) {
      var step = [];
      while (length > 0) {
        length = Math.floor(length / 2);
        step.push("remove");
      }
      return step;
    },
    loadParticles = function (options) {
      loadJSON("./assets/members.json", function (result) {
        var list = Object.keys(result.list);
        if (list.length) {
          list = list.map((v) => `${v}.jpg`);
          originData = data = list;
          originLength = list.length;

          options.particles.shape.images = list.map((k) => ({
            src: `./img/${k}`,
            width: 100,
            height: 125,
          }));
          options.particles.number.value = list.length;
          particleOptions = options;

          renderCount(list.length);
          particlesJS("particles-js", options);
        } else {
          loadJSON("/list", function (list) {
            originData = data = list;
            originLength = list.length;

            options.particles.shape.images = list.map((k) => ({
              src: `./img/${k}`,
              width: 320,
              height: 370,
            }));
            options.particles.number.value = list.length;
            particleOptions = options;
            renderCount(list.length);
            particlesJS("particles-js", options);
          });
        }
      });
    },
    toggleFinger = function (isShow) {
      document.getElementById("game-finger").style.display = isShow
        ? "flex"
        : "none";
    },
    renderCount = function (count) {
      document.getElementById("game-count").innerText = count;
    },
    playMusic = () => {
      var el = document.getElementById("audio");

      el.play();
    },
    game = function (step) {
      var item = step.next();

      playMusic();

      if (item.done) {
        return "done";
      } else {
        switch (item.value) {
          case "start":
            var options = {
              strings: ["THE<br/>THANOS<br/>GAME"],
              typeSpeed: 100,
              showCursor: false,
            };
            new Typed(".game-title", options);
            break;

          case "particle":
            document.getElementById("game-start").style.display = "none";
            document.getElementById("particles-js").style.display = "block";
            loadJSON("./assets/options.json", loadParticles);
            break;
        }
      }
    };

  game(gameStep);

  document.getElementById("game-start-btn").addEventListener("click", () => {
    game(gameStep);
  });

  function play() {
    var percent = Math.round((data.length / originLength) * 100);
    var isOver25Percent = percent > 25;
    renderCount(
      [
        `${data.length} 명`,
        // percent < 50 ? data.map(k => originData[k]).join('/') : ''
      ].join(" ")
    );

    particlesJS("particles-js", {
      ...particleOptions,
      particles: {
        ...particleOptions.particles,
        number: {
          ...particleOptions.particles.number,
          value: data.length,
        },
        shape: {
          ...particleOptions.particles.shape,
          images: data.map((v) => ({
            ...v,
            src: `./img/${v}`,
            width: 100,
            height: 125,
          })),
        },
        size: {
          ...particleOptions.particles.size,
          value: Math.min(
            Math.max(Math.round(originLength / data.length) * 10, 50),
            70
          ),
          random: isOver25Percent,
        },
        move: {
          ...particleOptions.particles.move,
          enable: !!percent,
          speed: (100 / percent || 1) * 0.1,
        },
      },
    });
  }

  document.addEventListener("click", () => {
    playMusic();
  });

  document.addEventListener("keydown", (e) => {
    if (data && data.length > 1) {
      if (e.code === "Enter") {
        data = shuffle(data).slice(0, data.length / 2);
        toggleFinger(true);
        setTimeout(function () {
          play();
          toggleFinger(false);
        }, 950);
      }
    }
  });
};
