import MarketingService from '../services/MarketingService';

export interface IWindow extends Window {
	sessionLayer: {
		core: {
			country: string,
			gtmId: string,
			language: string,
			locale: string,
		},
		marketingService: MarketingService,
	}
}
