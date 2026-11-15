// Fixture builds flip this to true to structurally disable every network
// write: no household sync, no sign-in calls, no journal upload, no push
// subscription. Used only by isolated test builds run from a local copy -
// the shipped app always has this false. Keeping the flag in one module
// means a fixture build cannot silently become a real build.
export const FIXTURE = false;
