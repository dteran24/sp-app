import { axiosProject } from "./AxiosInstance";
import { FormData } from "../models/formData";


export function getAllForms() {
    return axiosProject.get('');
}
export function getForm(formID: string) {
    return axiosProject.get(`/${formID}`);
}
export function editForm(formID: string | null, formData: FormData) {
    return axiosProject.put(`/${formID}`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export function submitForm(formData: FormData) {
    return axiosProject.post('', formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
}