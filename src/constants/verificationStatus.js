import { VERIFICATION_STATUSES } from 'cert-verifier-js/dist/verifier-es';

const DEFAULT = 'standby';
// TODO: refactor to use VERIFICATION_STATUSES.STARTING
const STARTED = 'started';

export default {
  ...VERIFICATION_STATUSES,
  DEFAULT,
  STARTED
};
