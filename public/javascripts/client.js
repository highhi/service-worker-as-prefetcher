(() => {
  if (!navigator.serviceWorker) return;

  function sendMessage(message) {
    // Service Workerがページをコントロールしていない場合はフォールバックする
    if (!navigator.serviceWorker.controller) return;

    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.addEventListener('message', event => {
        if (event.data.error) return reject(event.data.error);
        resolve(event.data);
      });

      navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    sendMessage({ command: 'delete' });
    const link = document.getElementById('sw-as-prefetch');
    if (!link) return;
    sendMessage({ command: 'prefetch', path: link.href });
  });

  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(registration => navigator.serviceWorker.ready)
    .catch(err => new Error(err));
})();