import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", {email, password});
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {data: {id: userId}});
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorsService = (data) => {
  return axios.post(`/api/post-infor-doctors`, data);
};
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctorService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getDoctorExtraInforById = (doctorId) => {
  return axios.get(`/api/get-doctor-extra-infor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookingAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookingAppointment = (data) => {
  return axios.post("/api/verify-booking-appointment", data);
};
//Specialty
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};
const getAllDetailSpecialty = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};
//clinic
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};
const getAllDetailClinic = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
export {
  postSendRemedy,
  getAllPatientForDoctor,
  getAllDetailClinic,
  getAllClinic,
  createNewClinic,
  handleLoginAPI,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorsService,
  getDetailInforDoctor,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDate,
  getDoctorExtraInforById,
  getProfileDoctorById,
  postPatientBookingAppointment,
  postVerifyBookingAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialty,
};
