// class ImageAttribute {
//   constructor(
//     key = "N7zj5rArj65fYFXdDYFsq24Qu1eq4DwmmCrrGZZW7mO7ZrcWgqZlpucBr9Aq",
//     prompt = null,
//     negative_prompt = null,
//     width = "512",
//     height = "512",
//     samples = "1",
//     num_inference_steps = "20",
//     seed = null,
//     guidance_scale = 7.5,
//     safety_checker = "yes",
//     enhance_prompt = "yes",
//     multi_lingual = "no",
//     panorama = "no",
//     self_attention = "no",
//     upscale = "no",
//     embeddings_model = "embeddings_model_id",
//     webhook = null,
//     track_id = null
//   ) {
//     this.key = key;
//     this.prompt = prompt;
//     this.negative_prompt = negative_prompt;
//     this.width = width;
//     this.height = height;
//     this.samples = samples;
//     this.num_inference_steps = num_inference_steps;
//     this.seed = seed;
//     this.guidance_scale = guidance_scale;
//     this.safety_checker = safety_checker;
//     this.enhance_prompt = enhance_prompt;
//     this.multi_lingual = multi_lingual;
//     this.panorama = panorama;
//     this.self_attention = self_attention;
//     this.upscale = upscale;
//     this.embeddings_model = embeddings_model;
//     this.webhook = webhook;
//     this.track_id = track_id;
//   }
// }

export default async function (req, res) {
  const stableDiffusionURL = "https://stablediffusionapi.com/api/v3/text2img"
  const prompt = req.body.prompt || '';
  const promptType = req.body.promptType
  const promptTone = req.body.promptTone
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  console.log('User prompt in generateImage:', prompt);
  console.log('User prompt type in generateImage:', promptType);
  console.log('User prompt tone in generateImage:', promptTone);

  try {
  var raw = JSON.stringify({
      "key": process.env.STABLE_DIFFUSION_KEY,
      "prompt": prompt,
      "negative_prompt": null,
      "width": "512",
      "height": "512",
      "samples": "1",
      "num_inference_steps": "20",
      "seed": null,
      "guidance_scale": 7.5,
      "safety_checker": "yes",
      "multi_lingual": "no",
      "panorama": "no",
      "self_attention": "no",
      "upscale": "no",
      "embeddings_model": "embeddings_model_id",
      "webhook": null,
      "track_id": null
    });

    const myHeaders = {
      'Content-Type': 'application/json'
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // response = requests.request("POST", stableDiffusionURL, headers=myHeaders, data=raw)
    // console.log(response)
    // response.text()

    // result = {"status":"success","generationTime":0.7899298667907715,"id":20937681,"output":["https:\/\/cdn.stablediffusionapi.com\/generations\/137c5cfa-3a47-4279-9aa8-16ececb112c8-0.png"],"meta":{"H":512,"W":512,"enable_attention_slicing":"true","file_prefix":"137c5cfa-3a47-4279-9aa8-16ececb112c8","guidance_scale":7.5,"model":"runwayml\/stable-diffusion-v1-5","n_samples":1,"negative_prompt":"","outdir":"out","prompt":"a cat on roof","revision":"fp16","safetychecker":"yes","seed":838719411,"steps":20,"vae":"stabilityai\/sd-vae-ft-mse"}}
    // res.status(200).json({ code: result.output})

    
    fetch(stableDiffusionURL, requestOptions)
    .then(response => {
      console.log(`the response after then is: ${response}`);
      return response.text();
    })
    .then(result => {
      console.log(`this is my result ${result} and result type: ${typeof(result)}`);
      res.status(200).json({ code: result})
    })
    .catch(error => console.log('error', error));
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with Stable Diffusion request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.'
        }
      });
    }
  }
}