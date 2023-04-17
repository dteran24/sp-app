export interface FormData{
    applicationStatus: string;
    registrationID: string | null;
    parentName: string;
    studentName: string;
    studentRegisterNumber: string;
    address: string;
    zipCode: string;
    city: string;
    state: string | null;
    country: string;
    emailAddress: string;
    primaryContactPerson: string;
    primaryContactMobile: string;
    secondaryContactPerson: string;
    secondaryContactMobile: string;
}
export interface UpdateFormData{
    // applicationStatus: string;
    // registrationID: string | null;
    parentName: string;
    studentName: string;
    // studentRegisterNumber: string;
    address: string;
    zipCode: string;
    city: string;
    state: string | null;
    country: string;
    emailAddress: string;
    primaryContactPerson: string;
    primaryContactMobile: string;
    secondaryContactPerson: string;
    secondaryContactMobile: string;

}