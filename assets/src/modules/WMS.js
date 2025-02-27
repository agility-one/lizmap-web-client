export default class WMS {

    constructor() {
        this._defaultGetFeatureInfoParameters = {
            repository: lizUrls.params.repository,
            project: lizUrls.params.project,
            SERVICE: 'WMS',
            REQUEST: 'GetFeatureInfo',
            VERSION: '1.3.0',
            SRS: 'EPSG:4326',
            INFO_FORMAT: 'text/html'
        };
    }

    /**
     * @param {Object} options - optional parameters which can override this._defaultGetFeatureInfoParameters
     * @return {Promise} Promise object represents data
     * @memberof WMS
     */
    async getFeatureInfo(options) {
        const response = await fetch(lizUrls.wms, {
            method: "POST",
            body: new URLSearchParams({
                ...this._defaultGetFeatureInfoParameters,
                ...options
            })
        });
        return await response.text();
    }
}
