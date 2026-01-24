import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  globalIgnores(["node_modules/**", ".next/**", "jsconfig.json"]),
  {
    rules: {
      "import/no-anonymous-default-export": "error",
    },
  },
]);

export default eslintConfig;
