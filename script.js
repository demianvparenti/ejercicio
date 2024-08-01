// Style Switcher Code
function setStandardStyle() {
    document.getElementById('style-link').href = 'style1.css';
}
function setHighContrastStyle() {
    document.getElementById('style-link').href = 'style2.css';
}

//Validations
function validateEmail(email)
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    /* 
        Desglose de la Expresión Regular
            ^: Comienzo de la línea.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            @: Exactamente un símbolo '@'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            \.: Exactamente un punto '.'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            $: Fin de la línea.
    */

    return regex.test(email);
}

function validateName(name) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,16}$/;
    
    /* 
        Desglose de la Expresión Regular
        Mínimo de 2 caracteres
        Máximo de 15 caracteres
        Puede contener letras, espacios y puede llevar acentos.       
    */
           
    return regex.test(name);
}

const TODAY = new Date().toISOString().split('T')[0];

function validateDate(date) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    
    /* 
        Desglose de la Expresión Regular
            4 caracteres (YYYY) seguido de un guión (-)
            2 caracteres (MM) seguido de un guión (-)
            2 caracteres (DD) 
    */

    const MATCH = date.match(regex);

    if (!MATCH) {
        return false;
    }

    const [_, YEAR, MONTH, DAY] = MATCH.map(Number);

    if (YEAR < 0 || YEAR > TODAY.split('-')[0]) {
        return false;
    }
    
    if (MONTH < 1 || MONTH > 12) {
        return false;
    }
    
    const LEAP_YEAR = YEAR % 4 === 0 && (YEAR % 100 !== 0 || YEAR % 400 === 0);
    const DAYS_IN_MONTH = [31, LEAP_YEAR ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (DAY < 1 || DAY > DAYS_IN_MONTH[MONTH - 1]) {
        return false;
    }

    if (date > TODAY){
        return false;
    }
    return true;
}

function checkForm(event) {

    event.preventDefault();

    const NAME = document.getElementById("name");
    const SURNAME = document.getElementById("surname");
    const EMAIL = document.getElementById("email");
    const DOB = document.getElementById("dob");
    const COUNTRY = document.getElementById("country");
    const ERROR_NAME = document.getElementById("errorName");
    const ERROR_SURNAME = document.getElementById("errorSurname");
    const ERROR_MAIL = document.getElementById("errorMail");
    const ERROR_DOB = document.getElementById("errorDOB");
    const ERROR_COUNTRY = document.getElementById("errorCountry");
    const SUCCESS_MESSAGE = document.getElementById("successMessage");

    ERROR_NAME.innerHTML = '';
    ERROR_SURNAME.innerHTML = '';
    ERROR_MAIL.innerHTML = '';
    ERROR_DOB.innerHTML = '';
    ERROR_COUNTRY.innerHTML = '';
    SUCCESS_MESSAGE.style.display = 'none';
    SUCCESS_MESSAGE.innerHTML = '';

    let hasError = false;

    if (!validateName(NAME.value.trim()) && NAME.required) {
        ERROR_NAME.innerHTML = "Nombre debe tener entre 2 y 15 caracteres alfabéticos.<br>";
        hasError = true;
    }

    if (!validateName(SURNAME.value.trim()) && SURNAME.required) {
        ERROR_SURNAME.innerHTML = "Apellido debe tener entre 2 y 15 caracteres alfabéticos.<br>";
        hasError = true;
    }

    if (!validateEmail(EMAIL.value.trim()) && EMAIL.required) {
        ERROR_MAIL.innerHTML = "Debe introducir un email válido.<br>";
        hasError = true;
    }

    if (!validateDate(DOB.value) && DOB.required) {
        ERROR_DOB.innerHTML = "Debe introducir una fecha de nacimiento en el pasado válida.<br>";
        hasError = true;
    }

    if (COUNTRY.value === "" && COUNTRY.required) {
        ERROR_COUNTRY.innerHTML = "Debe seleccionar un país de residencia.<br>";
        hasError = true;
    }

    if (!hasError) {
        SUCCESS_MESSAGE.innerHTML = 'Formulario enviado exitosamente!';
        SUCCESS_MESSAGE.style.display = 'block';
        document.querySelector('.myForm').reset();
    }
}