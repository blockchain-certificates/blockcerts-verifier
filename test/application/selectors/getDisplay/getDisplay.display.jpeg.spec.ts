import { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { getDisplayAsHTML } from '../../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import v3FixtureWithPng from '../../../fixtures/v3/testnet-v3-beta-display-png.json';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import { FakeXmlHttpRequest } from '../../__helpers/FakeXmlHttpRequest';

const v3FixtureWithImage = JSON.parse(JSON.stringify(v3FixtureWithPng));
v3FixtureWithImage.display.contentMediaType = 'image/jpeg';

describe('getDisplayAsHTML selector', function () {
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

  describe('given the certificate is a certificate with an image display property', function () {
    stubCertificateVerify(v3FixtureWithImage);

    describe('and the type is image/jpeg', function () {
      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(v3FixtureWithImage));
      });

      it('should return the display image as coded into the document', async function () {
        await store.dispatch(updateCertificateDefinition(v3FixtureWithImage));
        const state = store.getState();

        expect(getDisplayAsHTML(state)).toBe(`<img src="data:image/jpeg;base64,${v3FixtureWithImage.display.content}"/>`);
      });
    });
  });
});
