function showDevMark(env, color) {
    const root = document.createElement('div');
    const shadow = root.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    wrapper.className = 'dev-mark-wrapper';

    const markChild = document.createElement('div');
    markChild.className = 'dev-mark-text';
    markChild.innerText = env;

    const mark = document.createElement('div');
    mark.className = `dev-mark ${color}`;

    mark.appendChild(markChild);
    wrapper.appendChild(mark);

    wrapper.onclick = () => {
        wrapper.style.display = 'none';
    };

    const style = document.createElement('style');
    style.textContent = `
    .dev-mark-wrapper {
        position: fixed;
        top: 0;
        left: 50%;
        margin-left: -140px;
        width: 280px;
        border-radius: 0 0 6px 6px;
        overflow: hidden;
        z-index: 9999;
        cursor: pointer;
    }

    .dev-mark {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 4px 0;

        z-index: 9999;

        opacity: 1;
        transition: opacity 0.25s ease-in-out;
    }

    .dev-mark:hover {
        opacity: 0.25;
    }

    .dev-mark.black {
        background-color: #696969;
    }

    .dev-mark.brown {
        background-color: #593110;
    }

    .dev-mark.yellow {
        background-color: #ffcf00;
    }

    .dev-mark.green {
        background-color: #00ab00;
    }

    .dev-mark.blue {
        background-color: #0062c6;
    }

    .dev-mark.purple {
        background-color: #800080;
    }

    .dev-mark.pink {
        background-color: #f52394;
    }

    .dev-mark.orange {
        background-color: #ff7c00;
    }

    .dev-mark.red {
        background-color: #ff2000;
    }

    .dev-mark .dev-mark-text,
    .dev-mark .dev-mark-text:hover {
        font: 700 20px Helvetica, Arial, sans-serif;
        color: #fff;
        line-height: 24px;
        text-shadow: 0 1px rgba(0, 0, 0, 1);
        letter-spacing: 0.6px;

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
