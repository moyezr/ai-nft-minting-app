export default async function (req, res) {
    
    const ipfsHash = req.query.tokenId;

    console.log("Ipfs hash ==> ", ipfsHash);

    const imageURL = "https://gateway.pinata.cloud/ipfs/" + ipfsHash;

    res.status(200).json({
        name: `Ai Mints ${ipfsHash}`,
        image: imageURL,
        description: "An Ai NFT Minting application"
    })

}