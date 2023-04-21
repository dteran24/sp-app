export const NAME_VALIDATION = "^[a-zA-Z ]+$";
export const REGISTER_VALIDATION = "^R-[a-zA-Z]{3}.[0-9]{3}$";
export const EMAIL_VALIDATION = "^[^@\\s]+@[^@\\s]+\\.[^@\\s.]+$";
export const ZIP_VALIDATION = "^\\d{6}$";
export const CITY_VALIDATION = "^[a-zA-Z]+$";
export const MOBILE_VALIDATION = "^\\d{10}$";
export const AGE_VALIDATION = "^([4-9]|[1-9][0-9]|[1][0-0][0-9]|110)$"
export const BASE_URL = "http://localhost:3001/forms";
export function generateRegistrationId() {
    var numbers = '';
    for (var i = 0; i < 10; i++) {
      numbers += Math.floor(Math.random() * 10);
    }
    return numbers;
  }