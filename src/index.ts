// Inspired on http://www.2ality.com/2015/01/template-strings-html.html#comment-2078932192

import escape from "html-es6cape";

function htmlTemplateTag(
  literals: TemplateStringsArray,
  ...substs: string[]
): string {
  return literals.raw.reduce((acc, lit, i) => {
    let subst = substs[i - 1];
    if (Array.isArray(subst)) {
      subst = subst.join("");
    } else if (literals.raw[i - 1] && literals.raw[i - 1].endsWith("$")) {
      // If the interpolation is preceded by a dollar sign,
      // substitution is considered safe and will not be escaped
      acc = acc.slice(0, -1);
    } else {
      subst = escape(subst);
    }

    return acc + subst + lit;
  });
}

export default htmlTemplateTag;
