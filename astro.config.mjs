import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
  output: "hybrid",
  integrations: [tailwind(), react(
    {
      experimentalReactChildren: true,
    }
  )]
});
=======
  output: "hybrid"
});
>>>>>>> 433db5ca617c5c70cdb4e735af3ae8766550003b
