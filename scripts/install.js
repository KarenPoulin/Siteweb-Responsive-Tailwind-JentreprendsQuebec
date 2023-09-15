let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);


// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Add code to save event & show the install button.
    evt.preventDefault();
        // CODE AJOUTER LIGNE EN HAUT
        deferredInstallPrompt = evt;
        installButton.removeAttribute('hidden');
    }

function installPWA(evt) {
    console.log('click');
        // Add code show install prompt & hide the install button.
        deferredInstallPrompt.prompt();
        // Hide the install button, it can't be called twice.
        evt.srcElement.setAttribute('hidden', true);


        // Log user response to prompt.
        deferredInstallPrompt.userChoice
            .then((choice) => {
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt', choice);
                } else {
                    console.log('User dismissed the A2HS prompt', choice);
                }
                deferredInstallPrompt = null;
            });
    }


/* function installPWA() {
    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice
            .then((choice) => {
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt', choice);
                } else {
                    console.log('User dismissed the A2HS prompt', choice);
                }
                deferredInstallPrompt = null;
            })
            .catch((error) => {
                console.error('Error during PWA installation:', error);
            });
    }
} */

// Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
/**
* Event handler for appinstalled event.
* Log the installation to analytics or save the event somehow.
*
* @param {Event} evt
*/
function logAppInstalled(evt) {
// Add code to log the event
console.log('JEQ App was installed.', evt);
}