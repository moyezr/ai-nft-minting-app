import axios from "axios";

export default async function(req, res) {
const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-x2IfWi9SqvhfaBaUfQnSmNJz/user-Imca6qmgHc5ovh71iY9YNxA1/img-VysuHhfKQOwrj02IDMN6B8xQ.png?st=2023-02-01T09%3A03%3A21Z&se=2023-02-01T11%3A03%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-01T05%3A08%3A05Z&ske=2023-02-02T05%3A08%3A05Z&sks=b&skv=2021-08-06&sig=YhIbxBy8kulfzB9CiTly4cyVe4dgE6md6ZO7eC2u5RI%3D";
    try {
        
    const response  =  await axios.get(imageURL);
    
    const imageBlob = await response.data;
    // var file = new File([imageBlob], "name");

    // console.log("File --> ", file)

    res.status(200).json({
        success: true,
        imageBlob: imageBlob
    })
    console.log("Data fetched Successfully")
    return;
    } catch (error) {
        console.log("ERROR in api ", error);
    }
    

    res.status(404).json({
        success: false,
        message: "Couldn't fetch image data"
    })


    
}