import { mapStateToProps } from '../../../../src/components/atoms/DownloadLink/DownloadLinkContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('DownloadLinkContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a certificate definition in the state', function () {
      describe('and it is hosted on learning machine\'s system', function () {
        stubCertificateVerify(certificateFixture);

        it('should provide the correct download url as downloadLink', async function () {
          const store = configureStore();
          await store.dispatch(updateCertificateDefinition(certificateFixture));

          const state = store.getState();
          const expectedOutput = 'https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97?format=json';

          expect(mapStateToProps(state).downloadLink).toBe(expectedOutput);
        });
      });
    });
  });
});
