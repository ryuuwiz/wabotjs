import * as qrcode from "qrcode-terminal"
import { Client, LocalAuth, MessageContent } from "whatsapp-web.js"
import { nanoid } from 'nanoid'

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
})

client.on('ready', () => {
  console.log(`
  Whatsapp bot - Ryuuwiz
  Feat:
    - !hello -> Hello Message
    - !s -> Generate Sticker from Image
`);
});

client.on("message", async (msg) => {
  if (msg.body === '!menu') {
    await msg.reply(`
      Whatsapp bot - Ryuuwiz
      Feat:
        - !hello -> Hello Message
        - !s -> Generate Sticker from Image
    `);
    console.log(msg)
  }
  if (msg.body === '!hello') {
    await msg.reply('Hello, World!');
    console.log(msg)
  }
  if (msg.body.startsWith("!s") && msg.type === 'image') {
    let media: MessageContent;
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
    console.log(msg)
  }
})

client.on("message_create", async (msg) => {
  if (msg.body.startsWith("!s") && msg.type === 'image') {
    let media: MessageContent;
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
    console.log(msg)
  }
})

client.initialize();

