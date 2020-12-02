export type FotnoteProps = {
    fotnote: string;
}
export const FotnoteKeys = ['fotnote'];

export const Fotnote = ({fotnote}: FotnoteProps) => {
    return (
        <sup>
            {fotnote}
        </sup>
    );
};
