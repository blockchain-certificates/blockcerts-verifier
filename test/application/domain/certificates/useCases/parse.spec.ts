import { describe, expect, it, afterEach, vi, beforeAll, afterAll } from 'vitest';
import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/v2/valid-certificate-example.json';
import { Certificate } from '@blockcerts/cert-verifier-js';
import type { CertificateOptions } from '@blockcerts/cert-verifier-js';

describe('domain certificates parse method test suite', function () {
  beforeAll(function () {
    vi.mock('@blockcerts/cert-verifier-js', { spy: true });
  });

  afterEach(function () {
    vi.resetAllMocks();
  })

  afterAll(function () {
    vi.restoreAllMocks();
  });


  describe('handling localization', function () {
    describe('given no locale has been set as an option', function () {
      it('should call the Certificate constructor with the locale set to auto', async function () {
        await domain.certificates.parse(certificateFixture);
        expect(Certificate).toHaveBeenCalledWith(certificateFixture, { locale: 'auto' });
      });
    });

    describe('given the locale has been set to auto as an option', function () {
      it('should call the Certificate constructor with the locale set to auto', async function () {
        await domain.certificates.parse(certificateFixture, { locale: 'auto' });
        expect(Certificate).toHaveBeenCalledWith(certificateFixture, { locale: 'auto' });
      });
    });

    describe('given the locale has been set to a specific language as an option', function () {
      it('should call the Certificate constructor with the locale set accordingly', async function () {
        await domain.certificates.parse(certificateFixture, { locale: 'fr' });
        expect(Certificate).toHaveBeenCalledWith(certificateFixture, { locale: 'fr' });
      });
    });
  });

  describe('handling custom blockchain explorers', function () {
    describe('given it is set as an option', function () {
      it('should pass it as an option to the Certificate constructor', async function () {
        const fixtureOptions: CertificateOptions = {
          explorerAPIs: [{
            priority: 0,
            parsingFunction: (): any => {},
            serviceURL: 'test.com'
          }]
        };

        await domain.certificates.parse(certificateFixture, fixtureOptions);
        expect(Certificate).toHaveBeenCalledWith(certificateFixture, fixtureOptions);
      });
    });
  });
});
