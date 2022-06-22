import React from 'react';
import { setParams } from '@navikt/nav-dekoratoren-moduler';

export const openChatbot = (e: React.MouseEvent) => {
    e.preventDefault();
    setParams({ chatbotVisible: true }).then(() => {
        const chatButton = document.getElementById('chatbot-frida-knapp');
        chatButton?.click?.();
    });
};
