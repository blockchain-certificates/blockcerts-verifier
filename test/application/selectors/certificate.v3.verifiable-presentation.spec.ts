import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { getIsVerifiablePresentation, getDisplayAsHTML } from '../../../src/selectors/certificate';
import verifiablePresentationFixture from '../../fixtures/v3/mocknet-verifiable-presentation.json';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { FakeXmlHttpRequest } from '../__helpers/FakeXmlHttpRequest';

describe('certificate selectors test suite', function () {
  let store;
  const initialXhr = XMLHttpRequest;

  beforeAll(function () {
    (global.XMLHttpRequest as any) = FakeXmlHttpRequest;
    const initialState = getInitialState({ disableVerify: true });
    store = configureStore(initialState);
  });

  afterAll(function () {
    global.XMLHttpRequest = initialXhr;
    store = null;
  });

  describe('given the credential is a verifiable presentation', function () {
    beforeAll(async function () {
      await store.dispatch(updateCertificateDefinition(verifiablePresentationFixture as any));
    });

    describe('getIsVerifiablePresentation selector', function () {
      it('should return true', function () {
        const state = store.getState();
        expect(getIsVerifiablePresentation(state)).toBe(true);
      });
    });

    describe('getDisplayAsHTML selector', function () {
      it('should return the display HTML as coded into the document', function () {
        const state = store.getState();
        expect(getDisplayAsHTML(state)).toBe('<div></div>');
      });
    });
  });
});
