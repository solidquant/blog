(function () {
  'use strict';

  const handlePrivacyPolicyNoticeDismissal = () => {
    const storage = sessionStorage; // TODO : You may want to delete this line and uncomment the next line when your privacy policy is complete. Why? Because the deployed template should not use localStorage since it lacks a privacy policy.
    // const storage = true ? sessionStorage : localStorage
    const dismissedPrivacyPolicyNotice = storage.getItem(
      'dismissedPrivacyPolicyNotice'
    );
    const privacyNotice = document.getElementById('privacy-notice');

    if (!!dismissedPrivacyPolicyNotice) privacyNotice.classList.add('hidden');

    document
      .getElementById('privacy-notice-button-container')
      .addEventListener('click', () => {
        storage.setItem('dismissedPrivacyPolicyNotice', 'true');
        privacyNotice.classList.add('hidden');
      });
  };

  // Adapted from https://codepen.io/wilbo/pen/xRVLOj by Wilbert Schepenaar.

  const CLEAR_SELECTION_DELAY = 2000;

  const isPrismClass = preTag =>
    preTag.className.substring(0, 8) === 'language';

  const handleCodeCopying = () => {
    const preTags = document.getElementsByTagName('pre');

    if (!preTags) return;

    for (const preTag of preTags)
      if (isPrismClass(preTag))
        preTag.innerHTML = `<div class="copy">copy</div>${preTag.innerHTML}`;

    const clipboard = new ClipboardJS('.copy', {
      target: trigger => trigger.nextElementSibling,
    });

    clipboard.on('success', event => {
      event.trigger.textContent = 'copied!';

      setTimeout(() => {
        event.clearSelection();
        event.trigger.textContent = 'copy';
      }, CLEAR_SELECTION_DELAY);
    });
  };

  console.log('Dev mode is currently enabled.');

  handlePrivacyPolicyNoticeDismissal();
  handleCodeCopying();

})();
