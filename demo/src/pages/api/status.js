import * as hub from "@huggingface/hub";

async function getStatus() {
    const space = await hub.spaceInfo({ name: "tsaruggan/dunder-mifflin-RNNfinity", additionalFields: ["runtime"] });
    const status = space.runtime.stage;
    return status;
}

export default async (req, res) => {
    const status = await getStatus();
    res.status(200).json({ status });
};
