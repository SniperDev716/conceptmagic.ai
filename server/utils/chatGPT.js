const { Configuration, OpenAIApi } = require('openai');
const config = require('../config');

const configuration = new Configuration({ apiKey: config.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

exports.getDescription = async (image_url) => {
  try {
    const props = {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: "user",
          content: [
            {
              type: "iamge_url", image_url: {
                url: image_url
              }
            },
            { type: "text", text: "describe this image like a blip captioning model so that another text-to-image model can take your response and recreate this exact image." },
          ]
        }
      ]
    }

    const completion = await openai.createChatCompletion(props);
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.log("[LOG:ERROR-getDescription]", error);
    return "";
  }
}

exports.getPromptByKeywords = async (desc, prev) => {
  try {
    let prompt = `Turn these descriptions into a cohesive sentence: \n
    ${desc}
    `;
    if (prev) {
      prompt = `Edit this prompt with the following instruction “${desc}”. Keep as much of the original prompt intact, only change what’s needed to integrate the new instructions: \n
      ${prev}
      `;
    }
    const props = {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
          ]
        }
      ]
    }
    console.log(prompt);
    const completion = await openai.createChatCompletion(props);
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.log("[LOG:ERROR-getPromptByKeywords]", error);
  }
}