import { configureStore } from '../../../../src/store';
import {
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/organisms/FullScreenCertificate/FullScreenCertificateContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import XSSCertificateFixture from '../../../fixtures/xss-certificate-example.json';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import { getCertificateDefinition, getFinalStep, getVerifiedSteps } from '../../../../src/selectors/certificate';
import initialValidCertificateSteps from '../../../assertions/initialValidCertificateSteps';
import { getVerificationStatus } from '../../../../src/selectors/verification';
import stepVerified from '../../../../src/actions/stepVerified';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import initialize from '../../../../src/actions/initialize';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('FullScreenCertificateContainer test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps property', function () {
    stubCertificateVerify(XSSCertificateFixture);
    describe('given there is a certificate definition in the state', function () {
      let state;

      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(XSSCertificateFixture));
        store.dispatch(initialize({
          clickableUrls: true
        }));
        state = store.getState();
      });

      afterEach(function () {
        state = null;
      });

      it('should retrieve the recipient name', function () {
        expect(mapStateToProps(state).recipientName).toBe('Jérôme Collé');
      });

      it('should set the hasCertificateDefinition property to true', function () {
        expect(mapStateToProps(state).hasCertificateDefinition).toBe(true);
      });

      it('should retrieve the sanitized displayHtml property', function () {
        expect(mapStateToProps(state).displayHTML).toBe('<section><div style="background-color:red;">YO!</div></section>');
      });

      it('should retrieve the clickableUrls property', function () {
        expect(mapStateToProps(state).clickableUrls).toBe(true);
      });

      it('should retrieve the disableDownloadPdf property', function () {
        expect(mapStateToProps(state).disableDownloadPdf).toBe(false);
      });
    });

    describe('given there is no certificate definition in the state', function () {
      it('should set the hasCertificateDefinition property to false', function () {
        const state = store.getState();
        expect(mapStateToProps(state).hasCertificateDefinition).toBe(false);
      });
    });
  });

  describe('mapDispatchToProps object', function () {
    stubCertificateVerify(certificateFixture);

    describe('onClick method', function () {
      describe('when called', function () {
        beforeEach(async function () {
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          store.dispatch(stepVerified({
            code: 'getTransactionId',
            label: 'Getting transaction ID',
            status: VERIFICATION_STATUSES.SUCCESS,
            parentStep: 'proofVerification'
          }));
          store.dispatch(mapDispatchToProps.onClose());
        });

        it('should reset the certificate definition', function () {
          const state = store.getState();
          expect(getCertificateDefinition(state)).toBe(null);
        });

        it('should reset the verification status', function () {
          const state = store.getState();
          expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.DEFAULT);
        });

        it('should reset the verified steps', function () {
          const state = store.getState();
          expect(getVerifiedSteps(state)).toEqual(initialValidCertificateSteps);
        });

        it('should reset the final step', function () {
          const state = store.getState();
          expect(getFinalStep(state)).toBe(null);
        });
      });
    });
  });
});
