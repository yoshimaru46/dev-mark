function showDevMark(env, color) {
  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper';
  wrapper.className = `github-fork-ribbon-wrapper left fixed`;

  const ribbonChild = document.createElement('span');
  ribbonChild.className = 'github-fork-ribbon-text';
  ribbonChild.innerText = env;

  const ribbon = document.createElement('div');
  ribbon.className = `github-fork-ribbon ${color}`;

  ribbon.appendChild(ribbonChild);
  wrapper.appendChild(ribbon);
  document.body.prepend(wrapper);

  document.getElementById("wrapper").onclick = function () {
    document.getElementById('wrapper').style.display = "none";
  };
}

chrome.runtime.sendMessage({ method: "getConfig" }, async (response) => {
  const configs = JSON.parse(response.data);
  configs.configs.map(config => {

    const pattern = new RegExp(config.regexp);
    const result = pattern.test(location.host);

    if (result) {
      showDevMark(config.env, config.color);

    }
  });


});
