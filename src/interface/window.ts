import MarketingService from '../services/MarketingService';
import SessionLayer from '../SessionLayer';

export interface IWindow extends Window {
	sessionLayer: {
		core: SessionLayer,
		marketingService: MarketingService,
	}
}
