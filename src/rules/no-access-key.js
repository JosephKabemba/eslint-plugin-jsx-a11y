/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'No access key attribute allowed. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreaders and keyboard-only users create a11y complications.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-access-key.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const accessKey = getProp(node.attributes, 'accesskey');
      const accessKeyValue = getPropValue(accessKey);

      if (accessKey && accessKeyValue) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
