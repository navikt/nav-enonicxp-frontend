import React from 'react';

type Props = {
    warnings: React.ReactNode[];
    className?: string;
};

export const FragmentUtenforInnholdsseksjonVarsel = ({ className, warnings }: Props) => {
    return (
        <li key="fragment-utenfor-innholdsseksjon-warning" className={className}>
            {warnings.length === 1 ? 'Fragmentet' : 'Fragmentene'} ligger utenfor den angitte
            innholdsseksjonen, noe som kan føre til visningsfeil på nav.no. Under ser du hvilket
            innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="fragment-rette-feilen">
                    Flytt {warnings.length === 1 ? 'fragmentet' : 'fragmentene'} innenfor de
                    markerte eller stiplede strekene i Enonic, slik at det vises korrekt i
                    innholdsseksjonen.
                </li>
            </ul>
        </li>
    );
};
