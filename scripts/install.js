let deferredInstallPrompt = null;
const installButton = document.getElementById("butInstall");

installButton.addEventListener("click", installPWA);

window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
	deferredInstallPrompt = evt;
	installButton.removeAttribute("hidden");
}

function installPWA(evt) {
	// CODELAB: Add code show install prompt & hide the install button.
	deferredInstallPrompt.prompt();
	evt.srcElement.setAttribute("hidden", true);
	// CODELAB: Log user response to prompt.
	deferredInstallPrompt.userChoice.then((choice) => {
		if (choice.outcome === "accepted") {
			console.log("L'utilisateur a installé la PWA via le bouton.", choice);
		} else {
			console.log("L'utilisateur a refusé d'installer la PWA.", choice);
		}
		deferredInstallPrompt = null;
	});
}
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);

/*
 * Event handler for appinstalled event.
 * Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
	// CODELAB: Add code to log the event
    console.log('Jentreprends Quebec was installed.', evt);
}