import getInitialState from '../../../src/store/getInitialState';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import { getDisableDownloadPdf, getDisplayMode, getTheme } from '../../../src/selectors/api';
import * as DISPLAY_MODE from '../../../src/constants/displayMode';
import * as THEME from '../../../src/constants/theme';

describe('store getInitialState test suite', function () {
  it('should set the default verifiedSteps property', function () {
    expect(getVerifiedSteps(getInitialState())).toEqual([]);
  });

  describe('default display mode', function () {
    it('should be set to card mode', function () {
      expect(getDisplayMode(getInitialState())).toBe(DISPLAY_MODE.CARD);
    });

    describe('given the API requires a full mode', function () {
      it('should set the display mode to full', function () {
        const fixtureAPIConfifguration = {
          displayMode: DISPLAY_MODE.FULL
        };

        expect(getDisplayMode(getInitialState(fixtureAPIConfifguration))).toBe(DISPLAY_MODE.FULL);
      });
    });
  });

  describe('default theme', function () {
    it('should be set to bright', function () {
      expect(getTheme(getInitialState())).toBe(THEME.BRIGHT);
    });

    describe('given the API requires a dark theme', function () {
      it('should set the theme to dark', function () {
        const fixtureAPIConfifguration = {
          theme: THEME.DARK
        };

        expect(getTheme(getInitialState(fixtureAPIConfifguration))).toBe(THEME.DARK);
      });
    });
  });

  describe('default allow download pdf enable', function () {
    it('should be set to true', function () {
      expect(getDisableDownloadPdf(getInitialState())).toBe(false);
    });
  });
});
