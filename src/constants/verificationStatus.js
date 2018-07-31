import { VERIFICATION_STATUSES } from 'cert-verifier-js/dist/verifier-es';

const DEFAULT = 'standby';
// TODO: refactor to use VERIFICATION_STATUSES.STARTING
const STARTED = 'started';

const VERIFICATION_STATUS = {
  ...VERIFICATION_STATUSES,
  DEFAULT,
  STARTED
};

export default VERIFICATION_STATUS;
