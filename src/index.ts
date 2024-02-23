import * as qrcode from "qrcode-terminal"
import { Client } from "whatsapp-web.js"
import { nanoid } from 'nanoid'

const client = new Client({});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
})
client.on('ready', () => {
  console.log('Client is ready!');
});

// Hello Message
client.on('message', async (message) => {
  if (message.body === '!hello') {
    await message.reply('Hello, World!');
  }
});

// Sticker Generator
client.on("message", async (msg) => {
  if (msg.body.startsWith("!s") && msg.type === 'image') {
    let media;
    try {
      media = await msg.downloadMedia();
    } catch (error) {
      console.log(error);
      return msg.reply("Download image failed!");
    }

    client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: "John Doe",
      stickerName: nanoid()
    })
  }
})

client.initialize();

