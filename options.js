const ERROR_MESSAGE_FOR_SYNTAX_ERROR = 'Syntax Error. Value should be Json.';

function format_options() {
  const value = document.getElementById('dev-mark-config').value;

  const statusWrapper = document.getElementById('status-wrapper');
  const status = document.getElementById('status');

  try {
    JSON.parse(value)
  } catch {
    statusWrapper.classList.add('is-warning');
    statusWrapper.style.display = 'block';
    status.textContent = ERROR_MESSAGE_FOR_SYNTAX_ERROR;
    return
  }

  statusWrapper.classList.add('is-success');
  statusWrapper.style.display = 'block';
  status.textContent = 'Formatted !';

  document.getElementById('dev-mark-config').value
    = JSON.stringify(JSON.parse(value), null, 4)

  setTimeout(function () {
    statusWrapper.style.display = 'none';
    status.textContent = '';
  }, 750);
  statusWrapper.classList.remove('is-warning');
}

function save_options() {
  const value = document.getElementById('dev-mark-config').value;

  const statusWrapper = document.getElementById('status-wrapper');
  const status = document.getElementById('status');

  try {
    JSON.parse(value)
  } catch {
    statusWrapper.classList.add('is-warning');
    statusWrapper.style.display = 'block';
    status.textContent = ERROR_MESSAGE_FOR_SYNTAX_ERROR;
    return
  }

  chrome.storage.local.set({
    devMarkConfig: value,
  }, () => {
    statusWrapper.classList.add('is-success');
    statusWrapper.style.display = 'block';
    status.textContent = 'Saved !';

    setTimeout(function () {
      statusWrapper.style.display = 'none';
      status.textContent = '';
    }, 750);
  });

  statusWrapper.classList.remove('is-warning');
  statusWrapper.classList.remove('is-success');
}

const DEFAULT_VALUE = JSON.stringify({
  "configs": [
    {
      "env": "Develop", "regexp": "develop", "color": "green"
    },
    {
      "env": "Staging", "regexp": "staging", "color": "blue"
    }
  ]
}, null, 4);

function init() {
  document.getElementById('dev-mark-config-example').innerText = DEFAULT_VALUE;
  restore_configs()
}

function restore_configs() {
  chrome.storage.local.get(null, function (configs) {
    document.getElementById('dev-mark-config').value
      = configs.devMarkConfig || DEFAULT_VALUE;
  });
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById('format').addEventListener('click', format_options);
document.getElementById('save').addEventListener('click', save_options);
