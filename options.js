function save_options() {
  const value = document.getElementById('dev-mark-config').value;

  try {
    JSON.parse(value)
  } catch {
    const status = document.getElementById('status');
    status.textContent = 'Syntax Error. Option should be Json.';
    return
  }

  chrome.storage.local.set({
    devMarkConfig: value,
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

function restore_configs() {
  chrome.storage.local.get(null, function (configs) {
    document.getElementById('dev-mark-config').value = configs.devMarkConfig;
  });
}

document.addEventListener('DOMContentLoaded', restore_configs);
document.getElementById('save').addEventListener('click', save_options);
