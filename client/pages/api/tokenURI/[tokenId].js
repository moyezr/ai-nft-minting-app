export default async function (req, res) {
    
    const ipfsHash = req.query.tokenId.replace(".json", "");

    console.log("Ipfs hash ==> ", ipfsHash);

    const imageURL = "ipfs://" + ipfsHash;

    res.status(200).json({
        "name": `Ai Mints ${ipfsHash}`,
        "image": imageURL,
        "description": "An Ai NFT Minting application"
    })

}