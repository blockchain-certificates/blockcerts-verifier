import { describe, expect, it } from 'vitest';
import { configureStore } from '../../../../src/store';
import { mapStateToProps } from '../../../../src/components/molecules/SocialShare/SocialShareContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('SocialShareContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a certificate definition set in the state', function () {
      stubCertificateVerify(certificateFixture);

      it('should return its value', async function () {
        const store = configureStore();

        await store.dispatch(updateCertificateDefinition(certificateFixture) as any);

        const state = store.getState();
        const expectedOutput = 'https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97';

        expect(mapStateToProps(state).url).toBe(expectedOutput);
      });
    });
  });
});
