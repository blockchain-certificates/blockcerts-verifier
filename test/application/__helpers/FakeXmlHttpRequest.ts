import certIssuerIssuerProfile from '../../fixtures/cert-issuer-issuer-profile.json';
import autoIssuerProfile5915db9cf6548f11bcb9b9a2 from '../../fixtures/auto-issuer-5915db9cf6548f11bcb9b9a2.json';
import autoIssuerProfile58540bf958a6260d3c30fdc1 from '../../fixtures/auto-issuer-58540bf958a6260d3c30fdc1.json';
import mainnetIssuerProfile5a4fe9931f607f0f3452a65e from '../../fixtures/mainnet-issuer-5a4fe9931f607f0f3452a65e.json';
import blockcertsTestnetV2IssuerProfile from '../../fixtures/blockcerts-testnet-issuer-2.0.json';
import v1IssuerProfile from '../../fixtures/v1/got-issuer_live.json';

// after editing run npm run transpile:mocks:iife
export class FakeXmlHttpRequest {
  public url: string;
  public status: number;
  public responseText: string;

  open (method: string, url: string): void {
    this.url = url;
  }

  send (): void {
    this.status = 200;
    this.responseText = this.getMockResponseText();
    this.onload();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onload (): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRequestHeader (): void {}

  getMockResponseText (): string {
    switch (this.url) {
      case 'https://raw.githubusercontent.com/blockchain-certificates/cert-issuer/master/examples/issuer/profile.json':
        return JSON.stringify(certIssuerIssuerProfile);

      case 'https://auto-certificates.learningmachine.io/issuer/5915db9cf6548f11bcb9b9a2.json':
        return JSON.stringify(autoIssuerProfile5915db9cf6548f11bcb9b9a2);

      case 'https://auto-certificates.learningmachine.io/issuer/58540bf958a6260d3c30fdc1.json':
        return JSON.stringify(autoIssuerProfile58540bf958a6260d3c30fdc1);

      case 'https://blockcerts.learningmachine.com/issuer/5a4fe9931f607f0f3452a65e.json':
        return JSON.stringify(mainnetIssuerProfile5a4fe9931f607f0f3452a65e);

      case 'https://www.blockcerts.org/samples/2.0/issuer-testnet.json':
        return JSON.stringify(blockcertsTestnetV2IssuerProfile);

      case 'http://www.blockcerts.org/mockissuer/issuer/got-issuer_live.json':
      case 'https://www.blockcerts.org/mockissuer/issuer/got-issuer_live.json':
        return JSON.stringify(v1IssuerProfile);

      // imported from CVJS, maybe not necessary but does not necessarily harm the implementation so leaving
      case 'https://blockstream.info/api/tx/2378076e8e140012814e98a2b2cb1af07ec760b239c1d6d93ba54d658a010ecd':
        return JSON.stringify({
          vout: [
            {
              // hash
              scriptpubkey: 'b2ceea1d52627b6ed8d919ad1039eca32f6e099ef4a357cbb7f7361c471ea6c8'
            }
          ],
          vin: [
            {
              prevout: {
                // issuing adress
                scriptpubkey_address: '1AwdUWQzJgfDDjeKtpPzMfYMHejFBrxZfo'
              }
            }
          ],
          status: {
            confirmed: true,
            block_time: new Date('2018-02-08T00:23:34.000Z').getTime() / 1000
          }
        });

      // imported from CVJS, maybe not necessary but does not necessarily harm the implementation so leaving
      case 'https://blockstream.info/testnet/api/tx/140ee9382a5c84433b9c89a5d9fea26c47415838b5841deb0c36a8a4b9121f2e':
        return JSON.stringify({
          vout: [
            {
              // hash
              scriptpubkey: '68df661ae14f926878aabbe5ca33e46376e8bfb397c1364c2f1fa653ecd8b4b6'
            }
          ],
          vin: [
            {
              prevout: {
                // issuing adress
                scriptpubkey_address: 'mgdWjvq4RYAAP5goUNagTRMx7Xw534S5am'
              }
            }
          ],
          status: {
            confirmed: true,
            block_time: new Date('2022-04-05T18:45:30.000Z').getTime() / 1000
          }
        });
    }
  }
}
