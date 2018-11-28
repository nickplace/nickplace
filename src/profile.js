import gql from 'graphql-tag'

export const CREATE_PROFILE = gql`
  mutation ($requireLevelSurface: Boolean!, $requirePatient: Boolean!, $videoName: String){
    createProfile(
        requireLevelSurface: $requireLevelSurface, 
        requirePatient: $requirePatient,
        videoName: $videoName,
        status: 0) {
      id
    }
  }
`

export const ALL_PROFILES = gql`
  query {
    allProfiles(orderBy: createdAt_DESC, filter: { isArchived: false }) {
        id,

        # timestamps
        createdAt,
        updatedAt,
        bloodInjectedAt,
        testBeganAt,
        testEndedAt,

        videoName,
        status,

        #parameters
        rOscillation {
            maxDate
        },
        kOscillation{
            maxDate
        },
        alphaAngle,
        maOscillation{
            maxDate, coagulationIndex
        },
        ly30Ratio,
        ly30Oscillation{
            maxDate
        },
        baselineSweepWidth,
        baselineOscillation{
            maxDate
        },
        oscillations {
            id
        }
        patient {
            id,
            name
        }
    }
  }`

export const GET_PROFILE = gql`
  query profileQuery($id: ID!) {
    profile: Profile(id: $id) {
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

        #parameters
        rOscillation {
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex, createdAt
        },
        kOscillation{
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex, createdAt
        },
        alphaAngle,
        maOscillation{
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex, createdAt
        },
        ly30Ratio,
        ly30Oscillation{
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex, createdAt
        },
        baselineSweepWidth,
        baselineOscillation{
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex, createdAt
        },

        oscillations {
            id, minAngle, minDate, maxAngle, maxDate, coagulationIndex
        }

        patient {
            id,
            name
        }
    }
  }`

export const UPDATE_PROFILE_MUTATION = gql`
  mutation($profileId: ID!,
    $isArchived: Boolean,
    $testBeganAt: DateTime,
    $testEndedAt: DateTime,
    $bloodInjectedAt: DateTime,
    $status: Int,
    $baselineSweepWidth: Float,
    $baselineOscillationId: ID,
    $rOscillationId: ID,
    $kOscillationId: ID,
    $alphaAngle: Float,
    $maOscillationId: ID,
    $ly30Ratio: Float,
    $ly30OscillationId: ID ) {

    updateProfile(  id: $profileId, 
                    isArchived: $isArchived,
                    testBeganAt: $testBeganAt,
                    testEndedAt: $testEndedAt,
                    bloodInjectedAt: $bloodInjectedAt,
                    status: $status,
                    baselineSweepWidth: $baselineSweepWidth,
                    baselineOscillationId: $baselineOscillationId,
                    rOscillationId: $rOscillationId,
                    kOscillationId: $kOscillationId,
                    alphaAngle: $alphaAngle,
                    maOscillationId: $maOscillationId,
                    ly30Ratio: $ly30Ratio,
                    ly30OscillationId: $ly30OscillationId  ) {
        id
    }
  }`


export const ADD_OSCILLATION_ON_PROFILE = gql`
  mutation ($coagulationIndex: Float!, $maxAngle: Float!, $maxDate: Float!, $minAngle: Float!, $minDate: Float!, $profileId: ID!){
    createOscillation (coagulationIndex: $coagulationIndex, maxAngle: $maxAngle, maxDate: $maxDate, minAngle: $minAngle, minDate: $minDate, profileId: $profileId) {
      id
      profile {
        id
      }
    }
  }
`
