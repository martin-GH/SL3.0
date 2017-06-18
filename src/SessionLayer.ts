import {IWindow} from './interface/window';
import MarketingService from './services/MarketingService';

declare const window: IWindow;

class SessionLayer {
	public get country(): string {
		return 'de';
	}

	public constructor() {
		window.sessionLayer = {
			core: this,
			marketingService: null,
		}

		this.initServices();
	}

	private initServices(): void {
		new MarketingService();
	}
}

export default SessionLayer
