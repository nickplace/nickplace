import gql from 'graphql-tag'

export const ALL_PATIENTS = gql`
  query {
    allPatients(orderBy: createdAt_DESC, filter: { isArchived: false }) {
        id,
        hospitalID,
        name,
        bloodType,
        dateOfBirth,
        ethnicity,
        profiles {
            id
        },
        createdAt,
        updatedAt
    }
}`

export const GET_PATIENT = gql`
  query patientQuery($id: ID!) {
    patient: Patient(id: $id) {
        id,
        isArchived,
        hospitalID,
        name,
        bloodType,
        dateOfBirth,
        ethnicity,
        profiles {
            id
        },
        createdAt,
        updatedAt
    }
}`

export const PATIENT_PROFILES = gql`
  query patientProfiles($id: ID!) {
    patient: Patient(id: $id) {
        id,
        profiles(filter: { isArchived: false }) {
            id,
            isArchived,

            # timestamps
            createdAt,
            updatedAt,
            bloodInjectedAt,
            testBeganAt,
            testEndedAt,

            # options
            requireLevelSurface,
            requirePatient,
            videoName,
            status,

            oscillations {
                id
            }

            patient {
                id,
                name
            }
        }
    }
}`

export const UPDATE_PATIENT_MUTATION = gql`
  mutation($patientId: ID!, $isArchived: Boolean) {
    updatePatient(
        id: $patientId,
        isArchived: $isArchived) {
        id
    }
}`
