import sanitize from '../../../../sanitizer/sanitizer';

export default function sanitizeHTML (definition) {
  definition.displayHtml = sanitize(definition.displayHtml);
  return definition;
}
