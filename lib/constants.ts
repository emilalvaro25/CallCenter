/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law-or-agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Default Live API model to use
 */
export const DEFAULT_LIVE_API_MODEL =
  'gemini-2.5-flash-native-audio-preview-09-2025';

export const DEFAULT_VOICE = 'Zephyr';

export const AVAILABLE_VOICES = [
  'Zephyr',
  'Puck',
  'Charon',
  'Luna',
  'Nova',
  'Kore',
  'Fenrir',
  'Leda',
  'Orus',
  'Aoede',
  'Callirrhoe',
  'Autonoe',
  'Enceladus',
  'Iapetus',
  'Umbriel',
  'Algieba',
  'Despina',
  'Erinome',
  'Algenib',
  'Rasalgethi',
  'Laomedeia',
  'Achernar',
  'Alnilam',
  'Schedar',
  'Gacrux',
  'Pulcherrima',
  'Achird',
  'Zubenelgenubi',
  'Vindemiatrix',
  'Sadachbia',
  'Sadaltager',
  'Sulafat',
];

export interface Character {
  id: string; // The voice name, e.g., 'Zephyr'
  name: string; // The star name, e.g., 'Sirius'
  description: string;
  avatar: string; // Material symbol name
}

const STAR_NAMES = [
  'Sirius',
  'Canopus',
  'Arcturus',
  'Vega',
  'Capella',
  'Rigel',
  'Procyon',
  'Achernar',
  'Betelgeuse',
  'Hadar',
  'Altair',
  'Acrux',
  'Aldebaran',
  'Antares',
  'Spica',
  'Pollux',
  'Fomalhaut',
  'Deneb',
  'Mimosa',
  'Regulus',
  'Adhara',
  'Shaula',
  'Castor',
  'Bellatrix',
  'Elnath',
  'Miaplacidus',
  'Alnilam',
  'Alnair',
  'Alioth',
  'Dubhe',
  'Mirfak',
  'Wezen',
];

const CHARACTER_DESCRIPTIONS = [
  'A wise and guiding voice, calm and reassuring.',
  'A navigator\'s voice, steady and clear across any distance.',
  'A gentle and mysterious, with a soothing, ethereal tone.',
  'Bright, energetic, and full of youthful optimism.',
  'A brilliant and sharp mind, quick-witted and insightful.',
  'Powerful and commanding, a voice of authority and strength.',
  'Friendly and loyal, a trustworthy companion.',
  'A bold and assertive tone, leading with confidence.',
  'A grand and ancient voice, full of stories and wisdom.',
  'A foundational voice, stable and supportive.',
  'A stoic and reliable presence, direct and clear.',
  'A balanced and harmonious voice, fair and just.',
  'A mark of distinction, a unique and memorable voice.',
  'A deep, resonant voice with a hint of danger and intrigue.',
  'Graceful and elegant, precise and articulate.',
  'A dual-natured voice, capable of both humor and seriousness.',
  'A solitary and introspective voice, thoughtful and calm.',
  'A distant and artistic voice, creative and inspiring.',
  'A warm and radiant presence, full of positive energy.',
  'A regal and noble voice, born to lead.',
  'A warm and radiant presence, full of positive energy.',
  'A sharp and piercing voice, with intense focus.',
  'A quick and clever voice, always one step ahead.',
  'A warrior\'s voice, strong, determined, and protective.',
  'A steadfast and unyielding voice of reason.',
  'A calm and tranquil voice, bringing peace and serenity.',
  'A central and guiding light, a leader\'s voice.',
  'A traveler\'s voice, worldly and knowledgeable.',
  'A guiding star, a voice of direction and purpose.',
  'A guiding star, a voice of direction and purpose.',
  'A traveler\'s voice, worldly and knowledgeable.',
  'A multifaceted and dazzling voice, full of charisma.',
];

const AVATARS = [
  'elderly',
  'explore',
  'nights_stay',
  'emoji_people',
  'psychology',
  'security',
  'pets',
  'flag',
  'menu_book',
  'foundation',
  'shield_person',
  'balance',
  'military_tech',
  'report',
  'star',
  'duo',
  'self_improvement',
  'draw',
  'flare',
  'castle',
  'flare',
  'priority_high',
  'bolt',
  'swords',
  'gavel',
  'waves',
  'stars',
  'flight',
  'navigation',
  'navigation',
  'flight',
  'diamond',
];

export const CHARACTERS: Character[] = AVAILABLE_VOICES.map((voice, index) => ({
  id: voice,
  name: STAR_NAMES[index] || `Voice ${index + 1}`,
  description:
    CHARACTER_DESCRIPTIONS[index] || 'A unique and interesting voice.',
  avatar: AVATARS[index] || 'person',
}));
