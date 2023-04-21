export interface FormData{
    applicationStatus: string;
    registrationID: string | null;
    registrationDate: string;
    parentName: string;
    studentName: string;
    studentAge: number;
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
