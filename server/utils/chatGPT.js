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
          role: "system",
          content: [
            { type: "text", text: "You are a helpful GPT-4 assistant designed to describe the image provided in a detailed manner, like a BLIP captioning model. The goal is for another text-to-image model to be able to recreate the image from your description, so be extremely accurate and detailed in describing the image." },
          ]
        },
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
    const completion = await openai.createChatCompletion(props);
    console.log("[LOG]", "Prompt generated");
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.log("[LOG:ERROR-getPromptByKeywords]", error);
  }
}

exports.getIdeas = async (prompt) => {
  try {
    const props = {
      model: 'gpt-4-0125-preview',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that generate creative ideas based on a topic. Provide your answer in JSON structure like this {'ideas': ['', '', ...]}`
        },
        {
          role: "user",
          content: `What are 10 creative/clever changes this text-to-image prompt including, Style changes, add/remove elements, color changes, background changes: \n ${prompt}`,
        }
      ]
    }
    const completion = await openai.createChatCompletion(props);
    console.log("[LOG]", "Prompt generated"/* , completion.data.choices[0].message.content */);
    const data = JSON.parse(completion.data.choices[0].message.content);
    return data.ideas;
    // return [];
  } catch (error) {
    console.log("[ERROR]:getIdeas", error.message);
    return [];
  }
}
