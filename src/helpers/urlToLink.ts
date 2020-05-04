import Autolinker from 'autolinker';

export default function urlToLink (displayHTML: string): string {
  return Autolinker.link(displayHTML, {
    stripPrefix: false
  });
}
