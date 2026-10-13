import { globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"]),
);
