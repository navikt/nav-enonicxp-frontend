import React from 'react';

export const openChatbot = (e: React.MouseEvent) => {
    e.preventDefault();
    const chatButton = document.getElementById('chatbot-frida-knapp');
    chatButton?.click?.();
};
