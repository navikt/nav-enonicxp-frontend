export const getCookie =
    typeof document !== 'undefined'
        ? (key: string) => {
              return document.cookie
                  ?.split(';')
                  .map((cookie) => cookie.trim())
                  .find((cookie) => cookie.startsWith(`${key}=`))
                  ?.split('=')[0];
          }
        : (_: string) => null;
