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
            { type: "text", text: "Describe this image like a blip captioning model" },
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
      prompt = `Please add '${desc}' to the following sentence and make it cohesive: \n
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