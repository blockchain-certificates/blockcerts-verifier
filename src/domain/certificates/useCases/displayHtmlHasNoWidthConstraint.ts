const SECTION_TYPES: string[] = ['text', 'image', 'signature', 'variable'];

function getMatchingElementsExpr (): string {
  return SECTION_TYPES.map((sectionType: string) => `section[class*="${sectionType}"]`).join(', ');
}

export default function displayHtmlHasNoWidthConstraint (displayHtml: string): boolean {
  const parser = new DOMParser();
  const displayHtmlDom: Document = parser.parseFromString(displayHtml, 'text/html');
  const firstLevelChildrenCount: number = displayHtmlDom.body.childElementCount;

  const sectionChildrenCount: number = displayHtmlDom.body.querySelectorAll(getMatchingElementsExpr()).length;

  return firstLevelChildrenCount === sectionChildrenCount;
}
