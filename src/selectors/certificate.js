import * as VERIFICATION_STATUS from '../constants/verificationStatus';
import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';
import { isValidUrl } from '../helpers/validations';

export function getCertificateDefinition (state) {
  return state.certificateDefinition;
}

function getV1IssuedOn (definition) {
  return definition.documentToVerify.assertion.issuedOn;
}

function getV2IssuedOn (definition) {
  return definition.documentToVerify.issuedOn;
}

export function getIssuedOn (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return getV2IssuedOn(certificateDefinition) || getV1IssuedOn(certificateDefinition);
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

function getV1Link (definition) {
  return definition.documentToVerify.assertion.id;
}

function getV2Link (definition) {
  return definition.id
}

export function getRecordLink (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    if (isValidUrl(getV2Link(certificateDefinition))) {
      return getV2Link(certificateDefinition);
    } else {
      return getV1Link(certificateDefinition);
    }
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

function getV1MetadataJson (definition) {
  return definition.documentToVerify.assertion.metadataJson;
}

function getV2MetadataJson (definition) {
  return definition.documentToVerify.metadataJson;
}


export function getMetadataJson (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    let metadataJSON = null;

    // not super clean, but will fail if property is undefined, ensuring it does not exist.
    try {
      metadataJSON = JSON.parse(getV2MetadataJson(certificateDefinition));
    } catch (e) {
      try {
        metadataJSON = JSON.parse(getV1MetadataJson(certificateDefinition));
      } catch (e) {
        return null;
      }
    }
    return metadataJSON;
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
