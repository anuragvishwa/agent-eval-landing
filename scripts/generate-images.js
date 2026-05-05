import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const ai = new GoogleGenAI({ apiKey: process.env.Gemini_api_key });

const prompts = [
  {
    name: "instant-detection",
    prompt: "Futuristic monitoring dashboard with real-time alerts, glowing green accent color (#22c55e), dark purple background, showing anomaly detection graphs and warning indicators, clean minimal tech aesthetic, 4:3 aspect ratio"
  },
  {
    name: "auto-resolution",
    prompt: "Automated workflow visualization with connected nodes and playbooks, green (#22c55e) accent color, dark purple background, showing automated fix being applied, robotic arm or AI fixing system, tech aesthetic, 4:3 aspect ratio"
  },
  {
    name: "smart-context",
    prompt: "Knowledge graph visualization with interconnected data nodes, code snippets, and documentation, green (#22c55e) connections on dark purple background, neural network style, clean tech aesthetic, 4:3 aspect ratio"
  },
  {
    name: "global-coverage",
    prompt: "World map with glowing service nodes and connections across regions, green (#22c55e) accent dots and lines, dark purple background, showing global infrastructure monitoring, clean tech aesthetic, 4:3 aspect ratio"
  }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(item, publicDir, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: item.prompt,
        config: {
          responseModalities: ["IMAGE"],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          const outputPath = path.join(publicDir, `${item.name}.png`);
          fs.writeFileSync(outputPath, buffer);
          console.log(`Saved: ${outputPath}`);
          return true;
        }
      }
    } catch (error) {
      const errorMsg = error.message || JSON.stringify(error);
      if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
        const waitTime = 40000; // 40 seconds
        console.log(`Rate limited. Waiting ${waitTime/1000}s before retry ${attempt}/${maxRetries}...`);
        await sleep(waitTime);
      } else {
        console.error(`Error generating ${item.name}:`, errorMsg);
        return false;
      }
    }
  }
  console.error(`Failed to generate ${item.name} after ${maxRetries} retries`);
  return false;
}

async function generateImages() {
  const publicDir = path.join(__dirname, "../public");

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (let i = 0; i < prompts.length; i++) {
    const item = prompts[i];
    console.log(`\nGenerating: ${item.name} (${i + 1}/${prompts.length})...`);

    await generateWithRetry(item, publicDir);

    // Wait between requests to avoid rate limiting
    if (i < prompts.length - 1) {
      console.log("Waiting 45s before next image...");
      await sleep(45000);
    }
  }

  console.log("\nImage generation complete!");
}

generateImages();
