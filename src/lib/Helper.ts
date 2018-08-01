import * as Q from 'Q';

class Helper {
	public static generateGUID(): string {

		let fourChars = (): string => {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		};

		let eightChars = (): string => {
			return fourChars() + fourChars();
		};

		let twelveChars = (): string => {
			return fourChars() + fourChars() + fourChars();
		};

		return `${eightChars()}-${fourChars()}-${fourChars()}-${fourChars()}-${twelveChars()}`;
	}

	public static getUrlParameter(searchParameter: string): string {
		let params = window.location.search;
		let pageUrl = '';

		try {
			pageUrl = decodeURIComponent(params.substr(1));
		} catch (err) {
		}

		if (pageUrl !== '') {
			let urlVariable = pageUrl.split('&');
			let parameterName: string[];

			for (let i = 0; i < urlVariable.length; i++) {
				parameterName = urlVariable[i].split('=');

				if (parameterName[0] === searchParameter) {
					if (parameterName[1] !== undefined) {
						return parameterName[1];
					}

					return '';
				}
			}
		}

		return '';
	}

	public static extractFromObject(path: string, data: any): any {
		if (!data) {
			return '';
		}

		if (path.indexOf('.') === -1) {
			return data[path];
		}

		let arrPath = path.split('.');
		let key = arrPath.shift();

		if (typeof key === 'string' && data.hasOwnProperty(key)) {
			return Helper.extractFromObject(arrPath.join('.'), data[key]);
		}

		return '';
	}

	public static  generateGetParameterString(paramsObject: any, startWith: string = '?'): string {
		let result: string = '';

		for (let param in paramsObject) {
			if (paramsObject.hasOwnProperty(param) && paramsObject[param]) {
				result += `&${param}=${paramsObject[param]}`;
			}
		}

		if (result !== '') {
			result = startWith + result.substr(1, result.length);
		}

		return result;
	}

	public static accessElement(selector: string): Q.Promise<any> {
		let max = 0;
		let deferred = Q.defer();

		let interval = setInterval(() => {
			let elem = (document as any).querySelector(selector);

			if (elem !== null || max === 100) {
				deferred.resolve(elem);
				clearInterval(interval);
			}

			if (max >= 100 && !elem) {
				throw new Error(`Unable to access element ${selector}!`);
			}
			max++;
		}, 10);

		return deferred.promise;
	}

	public static isEmpty(...strings: string[]): boolean {
		for (let str of strings) {
			if (str != null && str.trim() !== '') {
				return false;
			}
		}

		return true;
	}

	public static ucfirst(str: string): string {
		str += '';
		let f = str.charAt(0).toUpperCase();
		return f + str.substr(1);
	}

	public static customTimeout(callback: (timeoutID: number) => void, factor: number, times: number): void {
		const internalCallback = function (tick: number, counter: number): any {
			return (): void => {
				if (--tick >= 0) {
					callback(window.setTimeout(internalCallback, ++counter * factor));
				}
			};
		}(times, 0);

		internalCallback(times, 0);
	}

	public static getMatchingUrlParameters(searchParameter: string): Array<string> {
		let params = window.location.search;
		let pageUrl = '';

		try {
			pageUrl = decodeURIComponent(params.substr(1));
		} catch (err) {
		}

		let matchingParameters: Array<string> = [];

		if (pageUrl !== '') {
			let urlVariable = pageUrl.split('&');
			let parameterName: string[];

			for (let i = 0; i < urlVariable.length; i++) {
				parameterName = urlVariable[i].split('=');

				if (parameterName[0] === searchParameter) {
					matchingParameters.push(parameterName[1]);
				}
			}
		}

		return matchingParameters;
	}

	public static flatten(buffer: Array<any>): any {
		let result = {};

		for (let item of buffer) {
			for (let key in item) {
				if (item.hasOwnProperty(key)) {
					result[key] = item[key];
				}
			}
		}

		return result;
	}

	public static generateCacheKey(paramsObject: any): string {
		let cacheKey: Array<string> = [];

		for (let param in paramsObject) {
			if (paramsObject.hasOwnProperty(param) && paramsObject[param]) {
				cacheKey.push(param.toLowerCase() + '=' + paramsObject[param].toLowerCase());
			}
		}

		cacheKey.sort();

		return cacheKey.join('-');
	}

	public static getOfferType(elem: HTMLElement | null): string {
		if (elem !== null) {
			return elem.getAttribute('data-offer-type') || '';
		}

		return '';
	}

	public static isValidLocaleString(value: any): boolean {
		return (typeof(value) === 'string' && value.match(/^([a-z]{2}_[A-Z]{2})$/) !== null);
	}
}

export default Helper;
