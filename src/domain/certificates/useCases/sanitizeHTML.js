import sanitize from '../../../../sanitizer/sanitizer';

export default function sanitizeHTML (definition) {
  const sanitizedDefinition = JSON.parse(JSON.stringify(definition));
  sanitizedDefinition.displayHtml = sanitize(sanitizedDefinition.displayHtml);
  return sanitizedDefinition;
}
