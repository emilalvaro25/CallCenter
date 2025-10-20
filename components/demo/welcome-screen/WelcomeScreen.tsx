/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen: React.FC = () => {
  const prompts = [
    'Tell me a story about a brave knight and a friendly dragon.',
    "Explain the theory of relativity like I'm five.",
    'What are some fun facts about the ocean?',
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon-container">
          <span className="icon welcome-icon">volume_up</span>
        </div>
        <h1>Welcome to TTS Studio</h1>
        <p>
          Press the connect button below and start speaking.
          <br />
          Try asking one of these prompts:
        </p>
        <div className="example-prompts">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt">
              <p>"{prompt}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
