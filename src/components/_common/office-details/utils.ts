export const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) {
        return '';
    }

    return phoneNumber
        .replace(/ /g, '')
        .split('')
        .reduce(
            (acc, digit, index) => acc + digit + (index % 2 === 1 ? ' ' : ''),
            ''
        )
        .trim();
};
