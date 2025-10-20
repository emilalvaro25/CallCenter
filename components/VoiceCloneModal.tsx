/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback } from 'react';
import Modal from './Modal';
import { useSettings } from '@/lib/state';
import './VoiceCloneModal.css';

const VoiceCloneModal = ({ onClose }: { onClose: () => void }) => {
  const { addCharacter } = useSettings();
  const [files, setFiles] = useState<File[]>([]);
  const [voiceName, setVoiceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleCreateClone = useCallback(() => {
    if (!voiceName.trim() || files.length === 0) {
      setError('Please provide a name and upload at least one audio file.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate backend processing
    setTimeout(() => {
      const newCharacter = {
        id: `custom-${voiceName.trim().replace(/\s+/g, '-')}-${Date.now()}`,
        name: voiceName.trim(),
        description: 'A custom voice clone created from user-provided audio.',
        avatar: 'waveform', // A new icon for custom voices
      };
      addCharacter(newCharacter);
      setIsLoading(false);
      onClose();
    }, 2500);
  }, [voiceName, files, addCharacter, onClose]);

  return (
    <Modal onClose={onClose}>
      <div className="voice-clone-modal">
        <h2>Create Custom Voice Clone</h2>
        <p className="modal-description">
          Upload 1-3 short, clear audio clips (WAV or MP3) without background noise to create a new voice.
        </p>

        <div className="form-field">
          <label htmlFor="voice-name">Voice Name</label>
          <input
            id="voice-name"
            type="text"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            placeholder="e.g., Project Narrator"
          />
        </div>

        <div className="form-field">
          <label htmlFor="audio-upload">Audio Samples</label>
          <div className="file-upload-area">
            <input
              id="audio-upload"
              type="file"
              multiple
              accept=".wav, .mp3"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="file-upload-content">
              <span className="icon">upload_file</span>
              <p>Drag & drop files here, or click to browse.</p>
              <p className="file-types">Supported formats: WAV, MP3</p>
            </div>
          </div>
          {files.length > 0 && (
            <div className="file-list">
              <h4>Uploaded Files:</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button" disabled={isLoading}>
            Cancel
          </button>
          <button onClick={handleCreateClone} className="create-button" disabled={isLoading || !voiceName.trim() || files.length === 0}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              'Create Clone'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VoiceCloneModal;