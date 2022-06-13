import SubstepsList from '../../../../src/components/organisms/SubstepsList/SubstepsList';
import type { VerificationSubstep } from '@blockcerts/cert-verifier-js';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('Substeps list component test suite', function () {
  let instance: SubstepsList;

  beforeEach(function () {
    instance = new SubstepsList();
    (instance as any).shadowRoot = {
      addEventListener: () => {}
    };
  });

  afterEach(function () {
    instance = null;
  });

  describe('given there are no substeps and no suite to render', function () {
    it('should be null', function () {
      const output = (instance as any)._render();
      expect(output).toBeNull();
    });
  });

  describe('given only substeps are provided', function () {
    let outputAsString: string;
    const subSteps: VerificationSubstep[] = [
      {
        code: 'parseIssuerKeys',
        label: 'Parse issuer keys',
        labelPending: 'Parsing issuer keys',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      },
      {
        code: 'checkAuthenticity',
        label: 'Check Authenticity',
        labelPending: 'Checking Authenticity',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];

    beforeEach(function () {
      const output = instance._render(
        {
          subSteps
        }
      );
      outputAsString = JSON.stringify(output);
    });

    it('should render one list only', function () {
      const elementMatchRegex = /<buv-substeps-list/g;
      const elementLookupMatches = outputAsString.match(elementMatchRegex);
      expect(elementLookupMatches).toBe(null);
    });

    it('should render the substeps', function () {
      // count how many HTML elements have this class set (exclude . to avoid CSS declaration match)
      const classLookupRegex = /[^.]buv-c-verification-substep/g;
      const elementLookupMatches = outputAsString.match(classLookupRegex);
      expect(elementLookupMatches.length).toBe(2);
    });

    it('should set the correct title to the substeps', function () {
      const expectedTitles = subSteps.map(subStep => subStep.label);
      const allTitlesAreSet = expectedTitles.every(title => outputAsString.includes(title));
      expect(allTitlesAreSet).toBe(true);
    });
  });

  describe('given only 1 suite is provided', function () {
    let outputAsString: string;
    const subSteps: VerificationSubstep[] = [
      {
        code: 'parseIssuerKeys',
        label: 'Parse issuer keys',
        labelPending: 'Parsing issuer keys',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      },
      {
        code: 'checkAuthenticity',
        label: 'Check Authenticity',
        labelPending: 'Checking Authenticity',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];

    beforeEach(function () {
      const output = instance._render(
        {
          suites: [
            {
              subSteps,
              proofType: 'Example'
            }
          ]
        }
      );
      outputAsString = JSON.stringify(output);
    });

    it('should render one list only', function () {
      const elementMatchRegex = /<buv-substeps-list/g;
      const elementLookupMatches = outputAsString.match(elementMatchRegex);
      expect(elementLookupMatches).toBe(null);
    });

    it('should render the substeps', function () {
      // count how many HTML elements have this class set (exclude . to avoid CSS declaration match)
      const classLookupRegex = /[^.]buv-c-verification-substep/g;
      const elementLookupMatches = outputAsString.match(classLookupRegex);
      expect(elementLookupMatches.length).toBe(2);
    });

    it('should set the correct title to the substeps', function () {
      const expectedTitles = subSteps.map(subStep => subStep.label);
      const allTitlesAreSet = expectedTitles.every(title => outputAsString.includes(title));
      expect(allTitlesAreSet).toBe(true);
    });
  });

  describe('given 1 suite and some substeps are provided', function () {
    let outputAsString: string;
    const subSteps: VerificationSubstep[] = [
      {
        code: 'parseIssuerKeys',
        label: 'Parse issuer keys',
        labelPending: 'Parsing issuer keys',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      },
      {
        code: 'checkAuthenticity',
        label: 'Check Authenticity',
        labelPending: 'Checking Authenticity',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];
    const suiteSubsteps: VerificationSubstep[] = [
      {
        code: 'testASuiteItem',
        label: 'Test a suite item',
        labelPending: 'Testing a suite item',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];

    beforeEach(function () {
      const output = instance._render(
        {
          subSteps,
          suites: [
            {
              subSteps: suiteSubsteps,
              proofType: 'Example'
            }
          ]
        }
      );
      outputAsString = JSON.stringify(output);
    });

    it('should merge all the substeps into one list only', function () {
      const elementMatchRegex = /<buv-substeps-list/g;
      const elementLookupMatches = outputAsString.match(elementMatchRegex);
      expect(elementLookupMatches).toBe(null);
    });

    it('should render the substeps and the suite substeps', function () {
      // count how many HTML elements have this class set (exclude . to avoid CSS declaration match)
      const classLookupRegex = /[^.]buv-c-verification-substep/g;
      const elementLookupMatches = outputAsString.match(classLookupRegex);
      expect(elementLookupMatches.length).toBe(3);
    });

    it('should set the correct title to the substeps', function () {
      const expectedTitles = subSteps.map(subStep => subStep.label);
      expectedTitles.push(suiteSubsteps[0].label);
      const allTitlesAreSet = expectedTitles.every(title => outputAsString.includes(title));
      expect(allTitlesAreSet).toBe(true);
    });
  });

  describe('given 2 or more suites and no substeps are provided', function () {
    let outputAsString: string;
    const subSteps: VerificationSubstep[] = [
      {
        code: 'parseIssuerKeys',
        label: 'Parse issuer keys',
        labelPending: 'Parsing issuer keys',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      },
      {
        code: 'checkAuthenticity',
        label: 'Check Authenticity',
        labelPending: 'Checking Authenticity',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];
    const suiteSubsteps: VerificationSubstep[] = [
      {
        code: 'testASuiteItem',
        label: 'Test a suite item',
        labelPending: 'Testing a suite item',
        parentStep: 'proofVerification',
        status: VERIFICATION_STATUSES.SUCCESS
      }
    ];

    beforeEach(function () {
      const output = instance._render(
        {
          suites: [
            {
              subSteps: suiteSubsteps,
              proofType: 'Example 1'
            },
            {
              subSteps,
              proofType: 'Example 2'
            }
          ]
        }
      );
      outputAsString = JSON.stringify(output);
    });

    it('should render 2 substeps lists', function () {
      const elementMatchRegex = /<buv-substeps-list/g;
      const elementLookupMatches = outputAsString.match(elementMatchRegex);
      expect(elementLookupMatches.length).toBe(2);
    });

    it('should render the suites title', function () {
      const expectedTitles = ['Example 1', 'Example 2'];
      const allTitlesAreSet = expectedTitles.every(title => outputAsString.includes(title));
      expect(allTitlesAreSet).toBe(true);
    });

    it('should set the correct title to the substeps', function () {
      const expectedTitles = subSteps.map(subStep => subStep.label);
      expectedTitles.push(suiteSubsteps[0].label);
      const allTitlesAreSet = expectedTitles.every(title => outputAsString.includes(title));
      expect(allTitlesAreSet).toBe(true);
    });
  });
});
