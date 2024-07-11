import moment from "moment";

export function calculateDuration(startTime, endTime) {
  // Parse the times using Moment.js
  const start = moment(startTime, "hh:mm A");
  const end = moment(endTime, "hh:mm A");

  // Calculate the duration
  const duration = moment.duration(end.diff(start));

  // Extract hours and minutes from the duration
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Format the duration
  return `${hours}hr : ${minutes}min`;
}

const TeacherProfile = {
  _id: "667cf4d03693047be9af525e",
  id: "Teacher-52024-2f4e4732-f797-4878-8a62-fbbc18cd894b",
  name: "John Doe",
  email: "john.doe@example.com",
  code: "JD123",
  basicDetails: {
    dateOfJoining: "2020-01-01T00:00:00.000Z",
    fullName: "Johnathan David Doe",
    timing: "09:00 AM - 05:00 PM",
    departments: "Mathematics",
    workEmailId: "jdoe@school.edu",
    classList: [
      "Class-52024-a6d8a51e-ee5a-4775-b9df-527b5b09a648",
      "Class-52024-97f20d75-0fdb-4fed-8e54-1e889423c107",
    ],
    subjectList: ["Algebra", "Calculus"],
    workLocationDetails: {
      addressLine1: "123 School Street",
      addressLine2: "School Town",
      city: "School City",
      pinCode: "12345",
      state: "School State",
    },
  },
  personalDetails: {
    fatherName: "David Doe",
    age: 45,
    contactNumber: "+1234567890",
    panCardNumber: "ABCDE1234F",
    address: {
      addressLine1: "456 Home Avenue",
      city: "Home City",
      pinCode: "67890",
      motherName: "Jane Doe",
      dateOfBirth: "1977-06-15T00:00:00.000Z",
      emailId: "janedoe@example.com",
      aadharCardNumber: "987654321012345",
      addressLine2: "Home Town",
      state: "Home State",
    },
  },
  educationalDetails: {
    degreeCertificate: "BSc Mathematics",
    fieldOfStudy: "Mathematics",
    institutionName: "XYZ University",
    locationOfInstitution: "University City",
    yearOfGraduation: 2005,
    additionalCertificates: "Certified Math Tutor",
  },
  workExperienceDetails: {
    numberOfYears: 10,
    previousInstituteName: "ABC High School",
    address: "789 Previous Institute Lane",
    dateOfJoining: "2010-08-01T00:00:00.000Z",
    dateOfLeaving: "2020-07-31T00:00:00.000Z",
  },
  __v: 0,
};

const NewATeacherArray = {
  _id: "667cf4d03693047be9af525e",
  id: "Teacher-52024-2f4e4732-f797-4878-8a62-fbbc18cd894b",
  name: "John Doe",
  email: "john.doe@example.com",
  code: "JD123",
  Details: [
    {
      basicDetails: {
        dateOfJoining: "2020-01-01T00:00:00.000Z",
        fullName: "Johnathan David Doe",
        timing: "09:00 AM - 05:00 PM",
        departments: "Mathematics",
        workEmailId: "jdoe@school.edu",
        classList: [
          "Class-52024-a6d8a51e-ee5a-4775-b9df-527b5b09a648",
          "Class-52024-97f20d75-0fdb-4fed-8e54-1e889423c107",
        ],
        subjectList: ["Algebra", "Calculus"],
        workLocationDetails: {
          addressLine1: "123 School Street",
          addressLine2: "School Town",
          city: "School City",
          pinCode: "12345",
          state: "School State",
        },
      },
    },
  ],
};
