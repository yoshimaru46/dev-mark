function showDevMark(env, color) {
  const root = document.createElement('div');
  const shadow = root.attachShadow({ mode: 'open' });

  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper';
  wrapper.className = 'github-fork-ribbon-wrapper left fixed';

  const ribbonChild = document.createElement('span');
  ribbonChild.className = 'github-fork-ribbon-text';
  ribbonChild.innerText = env;

  const ribbon = document.createElement('div');
  ribbon.className = `github-fork-ribbon ${color}`;

  ribbon.appendChild(ribbonChild);
  wrapper.appendChild(ribbon);

  wrapper.onclick = () => {
    wrapper.style.display = 'none';
  };

  const style = document.createElement('style');
  style.textContent = `
    /* Left will inherit from right (so we don't need to duplicate code) */
    .github-fork-ribbon {
        /* The right and left classes determine the side we attach our banner to */
        position: absolute;

        /* Add a bit of padding to give some substance outside the "stitching" */
        padding: 2px 0;

        /* Set the base colour */
        background-color: #a00;

        /* Set a gradient: transparent black at the top to almost-transparent black at the bottom */
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.15)));
        background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
        background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
        background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
        background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));

        /* Add a drop shadow */
        -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);

        /* Set the font */
        font: 700 13px "Helvetica Neue", Helvetica, Arial, sans-serif;

        z-index: 9999;
        pointer-events: auto;

        opacity: 1;
        transition: opacity .25s ease-in-out;
        -moz-transition: opacity .25s ease-in-out;
        -webkit-transition: opacity .25s ease-in-out;
    }

    .github-fork-ribbon:hover {
        opacity: 0.2;
    }

    .github-fork-ribbon.black {
        background-color: #696969;
    }

    .github-fork-ribbon.green {
        background-color: #006400;
    }

    .github-fork-ribbon.blue {
        background-color: #00008b;
    }

    .github-fork-ribbon.purple {
        background-color: #4b0082;
    }

    .github-fork-ribbon.orange {
        background-color: #ff8c00;
    }

    .github-fork-ribbon.red {
        background-color: #dc143c;
    }

    .github-fork-ribbon .github-fork-ribbon-text,
    .github-fork-ribbon .github-fork-ribbon-text:hover {
        /* Set the text properties */
        color: #fff;
        text-decoration: none;
        text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
        text-align: center;
        cursor: pointer;

        /* Set the geometry. If you fiddle with these you'll also need
          to tweak the top and right values in .github-fork-ribbon. */
        width: 200px;
        line-height: 20px;

        /* Set the layout properties */
        display: inline-block;
        padding: 2px 0;

        /* Add "stitching" effect */
        border-width: 1px 0;
        border-style: dotted;
        border-color: #fff;
        border-color: rgba(255, 255, 255, 0.7);
    }

    .github-fork-ribbon-wrapper {
        width: 150px;
        height: 150px;
        position: absolute;
        overflow: hidden;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }

    .github-fork-ribbon-wrapper.relative {
        position: relative;
    }

    .github-fork-ribbon-wrapper.fixed {
        position: fixed;
    }

    .github-fork-ribbon-wrapper.left {
        left: 0;
    }

    .github-fork-ribbon-wrapper.right {
        right: 0;
    }

    .github-fork-ribbon-wrapper.left-bottom {
        position: fixed;
        top: inherit;
        bottom: 0;
        left: 0;
    }

    .github-fork-ribbon-wrapper.right-bottom {
        position: fixed;
        top: inherit;
        bottom: 0;
        right: 0;
    }

    .github-fork-ribbon-wrapper.right .github-fork-ribbon {
        top: 42px;
        right: -43px;

        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .github-fork-ribbon-wrapper.left .github-fork-ribbon {
        top: 42px;
        left: -43px;

        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }


    .github-fork-ribbon-wrapper.left-bottom .github-fork-ribbon {
        top: 80px;
        left: -43px;

        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .github-fork-ribbon-wrapper.right-bottom .github-fork-ribbon {
        top: 80px;
        right: -43px;

        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }`;

  shadow.appendChild(style);
  shadow.appendChild(wrapper);

  wrapper.onclick = () => {
    wrapper.style.display = 'none';
  };

  document.body.prepend(root);
}

chrome.runtime.sendMessage({ method: 'getConfig' }, async (response) => {
  const configs = JSON.parse(response.data);
  configs.configs.map(config => {
    const pattern = new RegExp(config.regexp);
    const result = pattern.test(location.host);

    if (result) {
      showDevMark(config.env, config.color);
    }
  });
});
