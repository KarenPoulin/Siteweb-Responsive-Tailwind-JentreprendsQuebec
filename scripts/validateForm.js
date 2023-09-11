const validateForm = () => {
    const lastName = document.getElementById('nom');
    const firstName = document.getElementById('prenom');
    const companyName = document.getElementById('nom_entreprise');
    const companyType = document.getElementById('categorie_entreprise');
    const email = document.getElementById('courriel');
    const phone = document.getElementById('telephone');
    const address = document.getElementById('adresse');
    const postalCode = document.getElementById('codepostal');
    
    
    const lastNameValue = lastName.value.trim();
    const firstNameValue = firstName.value.trim();
    const companyNameValue = companyName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const addressValue = address.value.trim();
    const postalCodeValue = postalCode.value.trim();

    let noError = true;

    if (lastNameValue === '') {
        setError(lastName, "Nom de famille ne peut être vide");
        noError = false;
    } else {
        setSuccess(lastName);
    }

    if (firstNameValue === '') {
        setError(firstName, "Prénom ne peut être vide");
        noError = false;
    } else {
        setSuccess(firstName);
    }

    if (companyNameValue === '') {
        setError(companyName, "Nom de l'entreprise ne peut être vide");
        noError = false;
    } else {
        setSuccess(companyName);
    }

    if (companyType.value === "") {
        setError(companyType, "Veuillez choisir une catégorie d'entreprise");
        noError = false;
      } else {
        setSuccess(companyType);
      }

    if (emailValue === '') {
        setError(email, 'Courriel ne peut être vide');
        noError = false;
    } else if (!validateEmail(emailValue)) {
        setError(email, 'Format de courriel incorrect');
        noError = false;
    } else {
        setSuccess(email);
    }

    if (phoneValue === '') {
        setError(phone, 'Numéro de téléphone ne peut être vide');
        noError = false;
    } else if (!validatePhone(phoneValue)) {
        setError(phone, 'Format de numéro de téléphone incorrect');
        noError = false;
    } else {
        setSuccess(phone);
    }

    if (addressValue === '') {
        setError(address, "L'adresse ne peut être vide");
        noError = false;
    } else {
        setSuccess(address);
    }

    if (postalCodeValue === '') {
        setError(postalCode, "Le code postal ne peut être vide");
        noError = false;
    } else if (!validatePostalCode(postalCodeValue)) {
        setError(postalCode, 'Format de code postal incorrect');
        noError = false;
    } else {
        setSuccess(postalCode);
    }

    return noError;
}



const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhone = (phone) => {
    const re = /^\d{11}$/;
    return re.test(phone);
}

const validatePostalCode = (postalCode) => {
    const re = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    return re.test(postalCode);
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