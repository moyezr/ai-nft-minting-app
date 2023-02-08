export default async function contractURIFetcher(req, res) {


    res.status(200).json({
        "name": "AI Mints",
        "description": "AI Mints are an NFT Collection that uses openAI's DALL-E-2 api to fetch Images using Prompts and Converts them into NFTs. You can generate your own NFTs here: ",
        "image": ""
    })

}