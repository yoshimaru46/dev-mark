function showDevMark(env, color) {
    const root = document.createElement('div');
    const shadow = root.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    wrapper.className = 'dev-mark-ribbon-wrapper';

    const ribbonChild = document.createElement('span');
    ribbonChild.className = 'dev-mark-ribbon-text';
    ribbonChild.innerText = env;

    const ribbon = document.createElement('div');
    ribbon.className = `dev-mark-ribbon ${ color }`;

    ribbon.appendChild(ribbonChild);
    wrapper.appendChild(ribbon);

    wrapper.onclick = () => {
        wrapper.style.display = 'none';
    };

    const style = document.createElement('style');
    style.textContent = `
    .dev-mark-ribbon {
        position: absolute;

        padding: 2px 0;

        background-color: #696969;

        /* Add a drop shadow */
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);

        font: 700 16px Helvetica, Arial, sans-serif;

        z-index: 9999;
        pointer-events: auto;

        opacity: 1;
        transition: opacity 0.25s ease-in-out;
    }

    .dev-mark-ribbon:hover {
        opacity: 0.25;
    }

    .dev-mark-ribbon.black {
        background-color: #696969;
    }

    .dev-mark-ribbon.green {
        background-color: #006400;
    }

    .dev-mark-ribbon.blue {
        background-color: #00008b;
    }

    .dev-mark-ribbon.purple {
        background-color: #4b0082;
    }

    .dev-mark-ribbon.orange {
        background-color: #ff8c00;
    }

    .dev-mark-ribbon.red {
        background-color: #dc143c;
    }

    .dev-mark-ribbon .dev-mark-ribbon-text,
    .dev-mark-ribbon .dev-mark-ribbon-text:hover {
        color: #fff;
        text-decoration: none;
        text-shadow: 0 1px rgba(0, 0, 0, 1);
        text-align: center;
        cursor: pointer;

        width: 200px;
        line-height: 20px;

        display: inline-block;
        padding: 2px 0;

        border-width: 1px 0;
        border-style: dashed;
        border-color: #fff;
        border-color: rgba(255, 255, 255, 0.7);
    }

    .dev-mark-ribbon-wrapper {
        width: 150px;
        height: 150px;
        position: absolute;
        overflow: hidden;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }

    .dev-mark-ribbon-wrapper {
        position: fixed;
        left: 0;
    }

    .dev-mark-ribbon-wrapper .dev-mark-ribbon {
        top: 45px;
        left: -45px;
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
