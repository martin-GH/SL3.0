import axios, { AxiosPromise } from 'axios';
import Q from 'Q';

import config from '../config/config';
import { IWindow } from '../interface/window';
import Helper from '../lib/Helper';
import { DomSelector, UrlParameter } from '../lib/Constants';
import SessionLayer from '../core/SessionLayer';

declare const window: IWindow;

class MarketingService {
	private static cache: { [key: string]: any } = {};

	public static getParams(paramsOverride: any): Q.Promise<any> {
		return Helper.accessElement(DomSelector.FORMCLIENT).then((elem: HTMLScriptElement) => {
				return {
					act: Helper.getUrlParameter(UrlParameter.ACT),
					country: SessionLayer.getCountry(),
					geo: Helper.getUrlParameter(UrlParameter.GEO),
					ipaddress: Helper.getUrlParameter(UrlParameter.IP_ADDRESS),
					language: SessionLayer.getLanguage(),
					offerType: Helper.getOfferType(elem),
					referrer: document.referrer,
				}
			}).then((params: any) => {
				// TODO check override params with Constants.UrlParameter
				if (typeof(paramsOverride) === 'object' && Object.keys(paramsOverride).length > 0) {
					return Object.assign({}, params, paramsOverride);
				}

				return params;
			}).fail((reason: any) => console.log(reason));
	}

	public constructor() {
		window.sessionLayer.marketingService = this;
	}

	public getData(paramsOverride: any = {}): AxiosPromise {
		return MarketingService.getParams(paramsOverride).then((params: any) => {
			let cacheKey = Helper.generateCacheKey(params);

			if (!MarketingService.cache[cacheKey]) {
				const url = config.resources.marketingService + Helper.generateGetParameterString(params);

				MarketingService.cache[cacheKey] = axios.get(url).then((response: any): AxiosPromise => response.data);
			}

			return MarketingService.cache[cacheKey];
		});
	}
}

export default MarketingService;
