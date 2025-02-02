import { Client } from "@gradio/client";

async function generateScript(options) {
  const client = await Client.connect("tsaruggan/dunder-mifflin-RNNfinity");

  const { type, num, prompts } = options;

  const result = await client.predict("/predict", {
    type: type,
    num_lines: num,
    prompts: JSON.stringify(prompts),
  });
  return result.data;
}

export default async (req, res) => {
  const options = req.body;
  const script = await generateScript(options);
  res.status(200).json({ script });
};
