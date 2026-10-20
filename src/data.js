// Edit project content here. No API token or network request is required.
export const projects = [
  {
    name: 'ThinkCad',
    category: 'desktop',
    categoryLabel: 'Desktop application',
    number: '01',
    description: 'A native workspace for curious minds. Design circuits, write Arduino sketches, and explore electronics with a visual desktop toolkit.',
    technologies: ['C++20', 'Qt 6', 'Windows & Linux'],
    repository: 'https://github.com/Lyvt-Dev/ThinkCad',
    image: 'thinkcad.webp',
    imageAlt: 'ThinkCad showing an ESP8266 circuit connected to an OLED display',
    featured: true,
  },
  {
    name: 'ItemNPC',
    category: 'minecraft',
    categoryLabel: 'Minecraft plugin',
    number: '02',
    description: 'Give server interactions a new spin. Create rotating item NPCs with click-to-run commands, powered by modern display and interaction entities.',
    technologies: ['Java', 'Minecraft', 'Display entities'],
    repository: 'https://github.com/Lyvt-Dev/ItemNPC',
    artwork: 'item',
  },
  {
    name: 'ClanPlus',
    category: 'minecraft',
    categoryLabel: 'Minecraft plugin',
    number: '03',
    description: 'Bring your community together. A customizable clan plugin with Minecraft color code support, built to give every group its own identity.',
    technologies: ['Java', 'Minecraft', 'Clans'],
    repository: 'https://github.com/Lyvt-Dev/ClanPlus',
    artwork: 'clan',
  },
];

export const tools = [
  { name: 'Java', icon: 'java' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'C#', icon: 'csharp' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Qt', icon: 'qt' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Gradle', icon: 'gradle' },
  { name: 'Maven', icon: 'maven' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Docker', icon: 'docker' },
  { name: 'IntelliJ IDEA', icon: 'intellij' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'HTML / CSS', icon: 'html5' },
];

// CI fetches the real skin and sets a local asset URL for production builds.
export const minecraft = {
  username: 'Lyvt',
  skinUrl: import.meta.env.VITE_MINECRAFT_SKIN_URL
    ? new URL(import.meta.env.VITE_MINECRAFT_SKIN_URL, document.baseURI).href
    : 'https://minotar.net/skin/Lyvt',
};
