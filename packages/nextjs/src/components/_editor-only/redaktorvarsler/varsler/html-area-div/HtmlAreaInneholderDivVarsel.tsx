type Props = {
    warnings: React.ReactNode;
    className?: string;
};

export const HtmlAreaInneholderDivVarsel = ({ className, warnings }: Props) => {
    return (
        <li key="html-area-div-warning" className={className}>
            Det er brukt en <code>&lt;div&gt;</code>-tagg i seksjonen for formatert innhold, noe som
            kan føre til visningsfeil på nav.no. Under ser du hvilket innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="rette-feilen-1">
                    Lim innholdet i en ren tekst-editor (f.eks. Notepad). Kopier teksten derfra og
                    lim den inn i Enonic. Dette fjerner skjult formatering og uønsket kode.
                </li>
                <li>
                    Hvis du kan HTML: Fjern <code>&lt;div&gt;</code>-taggen direkte i
                    kildekodefeltet i Enonic.
                </li>
            </ul>
        </li>
    );
};
