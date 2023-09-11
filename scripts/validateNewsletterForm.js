const validateForm = () => {
    const email = document.getElementById('newsletterEmail');
    
    const emailValue = email.value.trim();

    let noError = true;

    if (emailValue === '') {
        setError(email, 'Courriel ne peut être vide');
        noError = false;
    } else if (!validateEmail(emailValue)) {
        setError(email, 'Format de courriel incorrect');
        noError = false;
    } else {
        setSuccess(email);
        window.alert('Vous êtes maintenant inscrit à l\'infolettre.');
    }

    return noError;
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const setError = (element, message) => {
    const inputControlRow = element.parentElement;
    const inputControl = inputControlRow.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    element.classList.add('error');
    element.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControlRow = element.parentElement;
    const inputControl = inputControlRow.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');
    
    errorDisplay.innerText = '';
    element.classList.add('success');
    element.classList.remove('error');
}