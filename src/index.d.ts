import CustomError from './lib/custom-error';

declare global {
	namespace Express {
		interface Response {
			error: (e: Error | typeof CustomError) => this;
		}
		interface Request {
			tokens: string;
		}
	}
}
