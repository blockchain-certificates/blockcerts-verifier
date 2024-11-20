import { getMetadata } from '../../../src/selectors/certificate';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import v2Fixture from '../../fixtures/v2/valid-certificate-example.json';
import v3Fixture from '../../fixtures/v3/testnet-v3.0-beta.json';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';
import { FakeXmlHttpRequest } from '../__helpers/FakeXmlHttpRequest';

describe('getMetadata selector', function () {
  let store;
  const initialXhr = XMLHttpRequest;

  beforeAll(function () {
    (global.XMLHttpRequest as any) = FakeXmlHttpRequest;
  });

  afterAll(function () {
    global.XMLHttpRequest = initialXhr;
  });

  beforeEach(function () {
    const initialState = getInitialState({ disableVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('given the blockcerts document has a metadataJson property', function () {
    stubCertificateVerify(v2Fixture);

    beforeEach(async function () {
      await store.dispatch(updateCertificateDefinition(v2Fixture));
    });

    it('should return metadata of the certificate', function () {
      const state = store.getState();

      expect(getMetadata(state)).toEqual(JSON.parse(v2Fixture.metadataJson));
    });
  });

  describe('given the blockcerts document has a metadata property', function () {
    stubCertificateVerify(v3Fixture as any);

    beforeEach(async function () {
      await store.dispatch(updateCertificateDefinition(v3Fixture as any));
    });

    it('should return metadata of the certificate', function () {
      const state = store.getState();
      expect(getMetadata(state)).toEqual(JSON.parse(v3Fixture.metadata));
    });
  });
});
