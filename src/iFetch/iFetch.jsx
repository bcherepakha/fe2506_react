import LoaderStore from '../Loader/LoaderStore';

/** Метод fetch – это XMLHttpRequest нового поколения.
 * Он предоставляет улучшенный интерфейс для осуществления запросов к серверу:
 * как по части возможностей и контроля над происходящим,
 * так и по синтаксису, так как построен на промисах.
 *
 * @param   Object      params              request params
 * @param   String      params.method       HTTP-метод. GET/POST/TRACE/DELETE/PUT и т.п.
 * @param   String      params.url          адрес запроса. http/https/ftp/file.
 * @param   Object      params.headers      request headers
 * @param   FormData    params.body         request body
 * @param   String      params.mode         в каком режиме кросс-доменности предполагается делать запрос
 *                                          'same-origin', 'no-cors', 'cors'
 * @param   String      params.credentials  указывает, пересылать ли куки и заголовки авторизации вместе с запросом
 *                                          'omit', 'same-origin', 'include'
 * @param   String      params.cache        указывает, как кешировать запрос
 *                                          'default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached'
 * @param   String      params.redirect     можно поставить 'follow' для обычного поведения
 *                                              при коде 30x (следовать редиректу) или
 *                                              'error' для интерпретации редиректа как ошибки.
 */
export default function iFetch(params) {
    const {url, ...options} = params;

    LoaderStore.showLoader();
    return fetch(url, options)
            .then(response => {
                LoaderStore.hideLoader();
                return response.json();
            });
}
