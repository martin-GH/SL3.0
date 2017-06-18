import config from '../config';
import axios, {AxiosPromise} from 'axios';
import {IWindow} from '../interface/window';

declare const window: IWindow;

class MarketingService {
	// private static deferredCache: { [key: string]: Promise<any> } = {};

	public constructor() {

		window.sessionLayer.marketingService = this;
	}

	public getData(params: any): AxiosPromise {
		// const cacheKey = 'abc';

		/*if (MarketingService.deferredCache[cacheKey]) {
			return MarketingService.deferredCache[cacheKey];
		}

		MarketingService.deferredCache[cacheKey] = new Promise();*/

		const url = config.resources.marketingService;

		return axios.get(url).then((response: any): AxiosPromise => {
			return response.data;
		});
	}
}

export default MarketingService;
