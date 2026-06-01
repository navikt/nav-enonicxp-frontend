type Props = {
    warnings: React.ReactNode;
    className?: string;
};

export const FormatertInnholdUtenforInnholdsseksjonVarsel = ({ className, warnings }: Props) => {
    return (
        <li key="part-utenfor-innholdsseksjon-warning" className={className}>
            Innholdet ligger utenfor den angitte innholdsseksjonen, noe som kan føre til
            visningsfeil på nav.no. Under ser du hvilket innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="rette-feilen">
                    Flytt innholdet innenfor de markerte eller stiplede strekene i Enonic, slik at
                    det vises korrekt i innholdsseksjonen.
                </li>
            </ul>
        </li>
    );
};
