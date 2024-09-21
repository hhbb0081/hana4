const depthTimer = (depth) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("depth1", new Date());
      resolve(depth + 1);
    }, depth * 1000);
  });

depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);

function org() {
  setTimeout(function () {
    console.log("depth1", new Date());
    setTimeout(function () {
      console.log("depth2", new Date());
      setTimeout(function () {
        console.log("depth3", new Date());
        throw new Error("Already 3-depth!!");
      }, 3000);
    }, 2000);
  }, 1000);

  console.log("START!", new Date());
}
