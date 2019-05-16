import VERIFICATION_STATUS from '../constants/verificationStatus';
import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';

export function getCertificateDefinition (state) {
  return state.certificateDefinition;
}

export function getIssuedOn (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuedOn;
  }

  return '';
}

export function getIssueDate (state) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    const objDate = new Date(getIssuedOn(state));
    return months[objDate.getMonth()] + ' ' + objDate.getDate() + ', ' + objDate.getFullYear();
  }

  return '';
}

export function getRecipientName (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.recipientFullName;
  }

  return '';
}

export function getCertificateTitle (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.name;
  }

  return '';
}

export function getIssuerName (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.name;
  }

  return '';
}

export function getIssuerLogo (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.image;
  }

  return '';
}

export function getDisplayHTML (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return sanitize(certificateDefinition.certificateJson.displayHtml);
  }

  return '';
}

export function getRecordLink (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.recordLink;
  }

  return '';
}

export function getDownloadLink (state) {
  const url = getRecordLink(state);

  if (url) {
    return domain.certificates.download(url);
  }

  return '';
}

export function getMetadataJson (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    try {
      return JSON.parse(certificateDefinition.metadataJson);
    } catch (e) {
      return null;
    }
  }

  return null;
}

export function getTransactionLink (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionLink;
  }

  return '';
}

export function getTransactionId (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionId;
  }

  return '';
}

export function getChain (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    const { chain } = certificateDefinition;
    return chain.name;
  }

  return '';
}

export function isTestChain (state) {
  const chain = getChain(state);

  return chain === 'Mocknet' || chain.indexOf('Testnet') > -1;
}

export function getVerifiedSteps (state) {
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStepCode) {
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state) {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUS.DEFAULT);
}

/* V1 SPECIFIC */
export function getCertificateImage (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.certificateImage;
  }

  return '';
}

export function getCertificateSubtitle (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.subtitle;
  }

  return '';
}

export function getCertificateDescription (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.description;
  }

  return '';
}

export function getCertificateSignatures (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.signatureImage;
  }

  return '';
}

export function getCertificateSeal (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.sealImage;
  }

  return '';
}

export function getFinalStep (state) {
  return state.finalStep;
}
