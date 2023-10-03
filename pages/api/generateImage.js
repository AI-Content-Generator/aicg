export default async function (req, res) {
  const stableDiffusionURL = ""
  const prompt = req.body.prompt || '';
  const promptType = req.body.promptType
  const promptTone = req.body.promptTone
  const keyword = req.body.keyword
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