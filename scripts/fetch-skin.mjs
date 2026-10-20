import { mkdir, writeFile } from 'node:fs/promises';

const username = 'Lyvt';
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Skin request failed (${response.status}) at ${new URL(url).hostname}`);
  return response;
}

// Resolve the username through Mojang, then fetch its official texture.
const profile = await (await get(`https://api.mojang.com/users/profiles/minecraft/${username}`)).json();
if (!/^[a-f0-9]{32}$/i.test(profile.id)) throw new Error('Minecraft profile was not found');
const session = await (await get(`https://sessionserver.mojang.com/session/minecraft/profile/${profile.id}`)).json();
const property = session.properties?.find(item => item.name === 'textures');
if (!property?.value) throw new Error('Minecraft profile has no texture data');
const textures = JSON.parse(Buffer.from(property.value, 'base64').toString('utf8'));
const textureUrl = new URL(textures.textures?.SKIN?.url);
if (textureUrl.hostname !== 'textures.minecraft.net') throw new Error('Unexpected Minecraft texture host');
textureUrl.protocol = 'https:';
const image = Buffer.from(await (await get(textureUrl.href)).arrayBuffer());
if (!image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error('Skin texture is not a PNG');
await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/skin.png', import.meta.url), image);
console.log(`Saved the official Minecraft skin for ${username}.`);
