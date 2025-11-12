import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup((base) => {
  return {
    ...base,
    themes: {
      light: "github-light",
    },
  };
});
