export const ifetch = async (url: string, attempts: number = 3): Promise<string | null> => {

    return new Promise(async (res) => {

        // Чтобы не ждать загрузки тормозного ресурса
        const timeoutMs = 3000;
        const controller = new AbortController();
        const timeoutId = setTimeout(async () => {
            controller.abort();
            res(null);
        }, timeoutMs);

        try {
            let response: any = await fetch(url, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.status != 200) throw new Error();
            response = await response.text();
            res(response);
        }
        catch(e) {
            if (attempts > 0) {
                setTimeout(async () => {
                    res(await ifetch(url, attempts - 1));
                }, 500);
            }
            else res(null);
        }

    });

}