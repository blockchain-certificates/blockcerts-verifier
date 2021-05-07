import { mapStateToProps } from '../../../../src/components/atoms/CertificateDetails/CertificateDetailsContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('CertificateDetailsContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a certificate definition in the state', function () {
      stubCertificateVerify(certificateFixture);
      let store;

      beforeEach(async function () {
        store = configureStore();
        await store.dispatch(updateCertificateDefinition(certificateFixture));
      });

      afterEach(function () {
        store = null;
      });

      it('should retrieve the recipient\'s name', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).recipientName).toBe('Jérôme Collé');
      });

      it('should retrieve the issue date', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issueDate).toBe('Jan 23, 2018');
      });

      it('should retrieve the issuedOn property', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuedOn).toBe('2018-01-23T00:43:15.978+00:00');
      });

      it('should retrieve the issuer name', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerName).toBe('Auto Testnet');
      });

      it('should retrieve the issuerLogo', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerLogo).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEUAAADr6+t1dXVYWFjNzc2wsLA6OjodHR2SkpKYcDHpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACNElEQVR4nO3VvW/aQBgG8De1wYx1YuGMBjkho1uhNCOlkKyASpPRSBHNaKO2rFRNqvzZvW/7wLG7pF2e32Dw+3L3nM+2IAIAAAAAAAAAAAAAAAAAAAAAANjTS/5ByHRWOnmz2+seFJiLilmqaoX2TViec7bXPigwZxXTVNVKs+wWrx/ipsPXD7mno5TNlbGvAzPnw/KXHfKw/M2Om6fnD3rCgXd2l5pOQ8gzdXZEOQvxQvrp+35A1Blfxjeiqwrfx+s4Iuf08v0ddVjJH1F3eH51ojuq9qIuOSMTQh2x8Ed29ijbsrBk3WvKU1l74odTtopYd1TtJTyhW4SI3fFYgdyo2K52KDbknRojtsZnI/JUdRq2qxXxHbND5GFUhIjLyWmVlUKO+UIS1WkI4bOv9kJaO776t0UIXwl7PtzbUoi42kR1GkLi7Xb7LbFDxE55YRHiLvr9fi/15ovUCmklqtMQMufPxexvQvoZeVdBUhHCOrUhYip29+ztikjd7HJBcE7sENOpC5Hv2tgO4S8OOaV7IgpSbIeYTl2Im8iR4q3XIWJ+NVwWRmbAyg4xnboQ+VTmKb/s+1A/uGPeSWWIKUhDdTUqxHTimhD5orYittfONQtpd0X0gBw12hRoTZuMnGOdr0Jkx6yp0ie93N5kmvFb3Zuy2b35NND/l7rw8QttJpMg4j8PPkc6RHZUrdFavs6e+PTUWfHVKv/4ejjQqgEAAAAAAAAAAAAAAAAAAAAA/C9/ALuxZu/Yhth+AAAAAElFTkSuQmCC');
      });

      it('should retrieve the transaction link', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).transactionLink).toBe('https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
      });

      it('should retrieve the transaction id', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).transactionId).toBe('62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
      });

      it('should retrieve the issuer\'s public key', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerPublicKey).toBe('ecdsa-koblitz-pubkey:msgxCqNzDiezUFrgQK7GZkWDGYC3fU6vQ8');
      });
    });
  });
});
