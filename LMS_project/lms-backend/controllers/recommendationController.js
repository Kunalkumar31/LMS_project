const { OpenAI } = require("openai");  // Import OpenAI class

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.recommendCourses = async (req, res) => {
  const { interest } = req.body;
  const prompt = `Suggest 5 course topics for someone interested in ${interest}.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // You can also use other models like "gpt-4"
      messages: [{ role: "user", content: prompt }],
    });

    const suggestions = response.choices[0].message.content.trim().split("\n");
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: "Error with AI recommendation", error: error.message });
  }
};
