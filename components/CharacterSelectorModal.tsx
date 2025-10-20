/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback, memo, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import Modal from './Modal';
import { CHARACTERS, Character } from '@/lib/constants';
import { useSettings } from '@/lib/state';
import './CharacterSelectorModal.css';

// Audio decoding utilities
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length; // numChannels = 1 for TTS
  const buffer = ctx.createBuffer(1, frameCount, 24000); // sampleRate = 24000 for TTS

  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

const CharacterCard = memo(
  ({
    character,
    isSelected,
    onSelect,
    onPreview,
    isPlaying,
    isLoading,
  }: {
    character: Character;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onPreview: (character: Character) => void;
    isPlaying: boolean;
    isLoading: boolean;
  }) => {
    return (
      <div
        className={`character-card ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(character.id)}
      >
        <div className="character-avatar">
          <span className="icon">{character.avatar}</span>
        </div>
        <div className="character-info">
          <h3>{character.name}</h3>
          <p>{character.description}</p>
        </div>
        <button
          className="preview-button"
          onClick={e => {
            e.stopPropagation();
            onPreview(character);
          }}
          disabled={isLoading}
          aria-label={`Preview voice for ${character.name}`}
        >
          <span className="icon">
            {isLoading
              ? 'hourglass_empty'
              : isPlaying
                ? 'stop_circle'
                : 'play_circle'}
          </span>
        </button>
      </div>
    );
  },
);

const CharacterSelectorModal = ({ onClose }: { onClose: () => void }) => {
  const { voice, setVoice } = useSettings();
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [currentSource, setCurrentSource] =
    useState<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext on user interaction
    if (!audioContext) {
      const initAudio = () => {
        // FIX: The 'webkitAudioContext' is a vendor-prefixed version for older browsers and is not standard.
        // Using the standard 'AudioContext' ensures better compatibility and adherence to web standards.
        const ctx = new window.AudioContext({
          sampleRate: 24000,
        });
        setAudioContext(ctx);
        window.removeEventListener('pointerdown', initAudio);
      };
      window.addEventListener('pointerdown', initAudio, { once: true });
    }
  }, [audioContext]);

  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY as string;
    if (!apiKey) {
      console.error('API key not found');
      return null;
    }
    return new GoogleGenAI({ apiKey });
  };

  const handleSelect = (voiceId: string) => {
    setVoice(voiceId);
    onClose();
  };

  const stopPlayback = useCallback(() => {
    if (currentSource) {
      currentSource.stop();
      currentSource.disconnect();
      setCurrentSource(null);
      setPlayingVoiceId(null);
    }
  }, [currentSource]);

  const handlePreview = useCallback(
    async (character: Character) => {
      if (!audioContext) {
        // Prompt user to interact if AudioContext is not ready
        alert('Please click on the screen first to enable audio playback.');
        return;
      }

      if (playingVoiceId === character.id) {
        stopPlayback();
        return;
      }

      stopPlayback(); // Stop any currently playing audio

      setLoadingVoiceId(character.id);

      try {
        const ai = getAiClient();
        if (!ai) return;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-tts',
          contents: [
            {
              parts: [
                {
                  text: `Hello, my name is ${character.name}. I am one of the voices you can choose.`,
                },
              ],
            },
          ],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: character.id },
              },
            },
          },
        });

        const base64Audio =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }

          const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            audioContext,
          );
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
          setPlayingVoiceId(character.id);
          setCurrentSource(source);
          source.onended = () => {
            setPlayingVoiceId(null);
            setCurrentSource(null);
          };
        }
      } catch (error) {
        console.error('Error generating voice preview:', error);
      } finally {
        setLoadingVoiceId(null);
      }
    },
    [audioContext, playingVoiceId, stopPlayback],
  );

  return (
    <Modal onClose={onClose}>
      <div className="character-selector-modal">
        <h2>Choose a Voice</h2>
        <p className="modal-description">
          Select a character to be your AI assistant's voice. Click the play
          button to hear a preview.
        </p>
        <div className="character-grid">
          {CHARACTERS.map(char => (
            <CharacterCard
              key={char.id}
              character={char}
              isSelected={voice === char.id}
              onSelect={handleSelect}
              onPreview={handlePreview}
              isPlaying={playingVoiceId === char.id}
              isLoading={loadingVoiceId === char.id}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CharacterSelectorModal;
