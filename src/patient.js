import gql from 'graphql-tag'

export const ALL_PATIENTS = gql`
  query {
    allPatients(orderBy: createdAt_DESC) {
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
        profiles {
            id,

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
