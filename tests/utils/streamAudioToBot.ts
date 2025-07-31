import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { Page } from 'playwright';

let ffmpegPath = '';
if (process.env.CI !== 'true') {
  ffmpegPath = path.resolve(__dirname, '../../tools/ffmpeg.exe');
  ffmpeg.setFfmpegPath(ffmpegPath);
} else {
  ffmpeg.setFfmpegPath('ffmpeg');
}

export async function streamAudioToBot(
  page: Page,
  mp3Path: string,
  wsUrl: string
): Promise<string> {
  const pcmPath = path.resolve(__dirname, '../../voice/output.pcm');
  console.log('🎯 Starting audio stream...');
  console.log(`🎵 Converting MP3 to PCM:\nFrom: ${mp3Path}\nTo:   ${pcmPath}`);

  await convertMp3ToPcm(mp3Path, pcmPath);
  console.log('🎧 MP3 to PCM conversion complete.');
  console.log('✅ PCM conversion completed');

  const pcmBuffer = fs.readFileSync(pcmPath);
  const audioBufferBase64 = Buffer.from(pcmBuffer).toString('base64');

  const finalTranscript: string = await page.evaluate(
    ({ audioBufferBase64, wsUrl }: { audioBufferBase64: string; wsUrl: string }): Promise<string> => {
      return new Promise((resolve) => {
        const audioBytes = Uint8Array.from(atob(audioBufferBase64), c => c.charCodeAt(0));
        const ws = new WebSocket(wsUrl);
        let transcript = '';

        ws.addEventListener('open', () => {
          ws.send('8,1,16000,8000');
          ws.send(JSON.stringify({ start_audio: true }));

          let offset = 0;
          const chunkSize = 2000;

          const sendChunks = () => {
            if (offset >= audioBytes.length) {
              setTimeout(() => {
                ws.send(JSON.stringify({ stop_audio: true }));
              }, 1000);
              return;
            }

            const chunk = audioBytes.slice(offset, offset + chunkSize);
            ws.send(chunk);
            offset += chunkSize;
            setTimeout(sendChunks, 50);
          };

          sendChunks();
        });

        ws.addEventListener('message', (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg.transcription) {
              transcript = msg.transcription;
              console.log('📩 Transcription received:', transcript);
            }
          } catch {
            // ignore
          }
        });

        setTimeout(() => {
          ws.close();
          resolve(transcript);
        }, 20000);
      });
    },
    { audioBufferBase64, wsUrl }
  );

  console.log('🧠 Final transcript from WebSocket:', finalTranscript);
  await page.waitForTimeout(2000);

  await page.evaluate((transcript: string) => {
    const textarea = document.querySelector('#auto-resize-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = transcript;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, finalTranscript);

  const injectedValue = await page.$eval('#auto-resize-textarea', (el: HTMLTextAreaElement) => el.value);
  console.log('💡 Injected transcript value:', injectedValue);

  return finalTranscript;
}

function convertMp3ToPcm(mp3Path: string, pcmPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(mp3Path)
      .audioChannels(1)
      .audioFrequency(16000)
      .audioCodec('pcm_s16le')
      .format('s16le')
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(pcmPath);
  });
}
