export default async (req, res) => {
    await fetch("https://tsaruggan-dunder-mifflin-rnnfinity.hf.space/");
    res.status(200).json({ status: "OK" });
};
  