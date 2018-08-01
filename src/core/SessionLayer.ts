import { IWindow } from '../interface/window';
import MarketingService from '../services/MarketingService';
import Helper from '../lib/Helper';
import { DomSelector } from '../lib/Constants';

declare const window: IWindow;

class SessionLayer {
	public static getCountry(): string {
		return SessionLayer.getLocale().slice(3);
	}

	public static getLanguage(): string {
		return SessionLayer.getLocale().substr(0, 2);
	}

	public static getLocale(): string {
		let dynamicLocale = document.head.getAttribute('data-locale');

		if (Helper.isValidLocaleString(dynamicLocale)) {
			return dynamicLocale as string;
		}

		let embedScriptTag = document.getElementById(DomSelector.SESSIONLAYER);

		if (embedScriptTag === null) {
			console.log(`#${DomSelector.SESSIONLAYER} not found`);
			return '';
		}

		let locale = embedScriptTag.getAttribute('data-locale');

		if (Helper.isValidLocaleString(locale)) {
			return locale as string;
		}

		console.log(`data-locale is not set on #${DomSelector.SESSIONLAYER}`);
		return '';
	}

	public static getGTMID(): string {
		let embedScriptTag = document.getElementById(DomSelector.SESSIONLAYER);

		if (embedScriptTag === null) {
			console.log(`#${DomSelector.SESSIONLAYER} not found`);
			return '';
		}

		let gtmId = embedScriptTag.getAttribute('data-gtmid');

		if (gtmId && typeof(gtmId) === 'string' && gtmId !== 'undefined') {
			return gtmId;
		}

		console.log(`data-gtmid is not set on #${DomSelector.SESSIONLAYER}`);
		return '';
	}

	public constructor() {
		window.sessionLayer = {
			core: {
				country: SessionLayer.getCountry(),
				gtmId: SessionLayer.getGTMID(),
				language: SessionLayer.getLanguage(),
				locale: SessionLayer.getLocale(),
			},
			marketingService: null,
		};
	}

	public init(): void {
		new MarketingService();
	}
}

export default SessionLayer
