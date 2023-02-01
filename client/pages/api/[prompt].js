const { Configuration, OpenAIApi } = require("openai");


// org-x2IfWi9SqvhfaBaUfQnSmNJz
// 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
export default async function (req, res) {


  const prompt = req.query.prompt;

  console.log("Prompt --> ", prompt);

    const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);


    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 4,
            size: "512x512",
          });
        const arr = response.data.data;

        
        const imageURLs = arr.map((el, i) => {
          console.log(`URL ${i} --> ${el.url}`)
          return el.url
        })

    res.status(200).json({
        success: true,
        imageURLs: imageURLs
    })
    return ;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }

      res.status(404).json( {
        success: false
      })

}